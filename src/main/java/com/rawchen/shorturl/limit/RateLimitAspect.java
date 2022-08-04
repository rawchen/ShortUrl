package com.rawchen.shorturl.limit;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.google.common.util.concurrent.RateLimiter;
import com.rawchen.shorturl.entity.Result;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.concurrent.TimeUnit;

/**
 * 限流切面
 *
 * @author RawChen
 * @date 2022-03-31 11:46
 */
@Aspect
@Component
public class RateLimitAspect {

	private static final Logger logger = LoggerFactory.getLogger(RateLimitAspect.class);

	/**
	 * 缓存
	 * maximumSize 设置缓存个数
	 * expireAfterWrite 写入后过期时间
	 */
	private static LoadingCache<String, RateLimiter> limitCaches = CacheBuilder.newBuilder()
			.maximumSize(1000)
			.expireAfterWrite(1, TimeUnit.MILLISECONDS)
			.build(new CacheLoader<String, RateLimiter>() {
				@Override
				public RateLimiter load(String key) {
					double perSecond = RateLimitUtil.getCacheKeyPerSecond(key);
					return RateLimiter.create(perSecond);
				}
			});

	/**
	 * 切点
	 * 通过扫包切入 @Pointcut("execution(public * com.rawchen.shorturl.*.*(..))")
	 * 带有指定注解切入 @Pointcut("@annotation(com.rawchen.shorturl.annotation.RateLimit)")
	 */
	@Pointcut("@annotation(com.rawchen.shorturl.limit.RateLimit)")
	public void pointcut() {
	}

	@Around("pointcut()")
	public Object around(ProceedingJoinPoint point) throws Throwable {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		MethodSignature signature = (MethodSignature) point.getSignature();
		Method method = signature.getMethod();
		if (method.isAnnotationPresent(RateLimit.class)) {
			String cacheKey = RateLimitUtil.generateCacheKey(method, request);
			RateLimiter limiter = limitCaches.get(cacheKey);
			if (!limiter.tryAcquire()) {
				String pointMethodName = point.getSignature().getName();
				logger.info("限流{}方法，具体内容【{}】", pointMethodName, cacheKey);
				if ("toLink".equals(pointMethodName)) {
					return "redirect:" + "/400";
				} else {
					return Result.fail("你手速太快了");
				}
			}
		}
		return point.proceed();
	}
}
