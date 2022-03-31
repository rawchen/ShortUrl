package com.rawchen.shorturl.limit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 限流注解
 *
 * @author RawChen
 * @date 2022-03-31 11:44
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {

	/**
	 * 资源名称
	 *
	 * @return
	 */
	String name() default "默认资源";

	/**
	 * 每秒允许数（qps），默认每秒0.1次也就是10秒允许访问一次
	 *
	 * @return
	 */
	double perSecond() default 0.1;

}
