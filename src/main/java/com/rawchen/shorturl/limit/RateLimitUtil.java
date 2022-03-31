package com.rawchen.shorturl.limit;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 限流工具
 *
 * @author RawChen
 * @date 2022-03-31 11:48
 */
public class RateLimitUtil {
	/**
	 * 获取唯一key根据注解类型，规则为： 资源名:ip:perSecond
	 *
	 * @param method
	 * @param request
	 * @return
	 */
	public static String generateCacheKey(Method method, HttpServletRequest request) {
		//获取方法上的注解
		RateLimit rateLimit = method.getAnnotation(RateLimit.class);
		StringBuffer cacheKey = new StringBuffer(rateLimit.name() + ":");
		cacheKey.append(getIpAddr(request) + ":");
		cacheKey.append(rateLimit.perSecond());
		return cacheKey.toString();
	}

	/**
	 * 获取缓存key的限制每秒访问次数
	 * <p>
	 * 规则 资源名:业务key:perSecond
	 *
	 * @param cacheKey
	 * @return
	 */
	public static double getCacheKeyPerSecond(String cacheKey) {
		String perSecond = cacheKey.split(":")[2];
		return Double.parseDouble(perSecond);
	}

	/**
	 * 获取客户端IP地址
	 *
	 * @param request 请求
	 * @return
	 */
	public static String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
			if ("127.0.0.1".equals(ip)) {
				//根据网卡取本机配置的IP
				InetAddress inet = null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ip = inet.getHostAddress();
			}
		}
		// 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
		if (ip != null && ip.length() > 15) {
			if (ip.indexOf(",") > 0) {
				ip = ip.substring(0, ip.indexOf(","));
			}
		}
		if ("0:0:0:0:0:0:0:1".equals(ip)) {
			ip = "127.0.0.1";
		}
		return ip;
	}
}
