package com.rawchen.shorturl.controller;

import cn.hutool.core.util.StrUtil;
import com.rawchen.shorturl.entity.Result;
import com.rawchen.shorturl.entity.ShortUrl;
import com.rawchen.shorturl.limit.RateLimit;
import com.rawchen.shorturl.mapper.UrlMapper;
import org.apache.commons.httpclient.util.URIUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author RawChen
 * @date 2022-03-30 17:49
 */
@Controller
public class WebController {

	@Autowired
	private UrlMapper mapper;

	@RequestMapping("/")
	public String index() {
		return "index";
	}

	@RequestMapping("/404")
	public String errorIndex() {
		return "404";
	}

	@RequestMapping("/400")
	public String limitPage() {
		return "400";
	}

	@RateLimit(name = "短链跳转接口", perSecond = 0.5)
	@RequestMapping("/{code}")
	public String toLink(@PathVariable String code, Model model) {
		try {
			ShortUrl shortUrl = mapper.getByCode(code);
			if (shortUrl != null) {
				if (shortUrl.getPassword() != null) {
					shortUrl.setPassword(shortUrl.getPassword().trim());
				}
				//如果有密码
				if (StrUtil.isBlank(shortUrl.getPassword())) {
					//没密码
					mapper.addViewNumberById(shortUrl.getId());
					return "redirect:" + URIUtil.encodeQuery(shortUrl.getLink());
				} else {
					model.addAttribute("code", shortUrl.getCode());
					return "password";
				}
			} else {
				return "redirect:" + "/404";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:" + "/404";
	}

	@ResponseBody
	@RateLimit(name = "短链带密码跳转接口", perSecond = 0.5)
	@RequestMapping("/pageByPassword")
	public Result pageByPassword(@RequestBody ShortUrl shortUrlData) {
		try {
			if (shortUrlData != null && StrUtil.isBlank(shortUrlData.getPassword())) {
				return Result.fail("需要密码哦");
			} else {
				if (shortUrlData != null && shortUrlData.getPassword() != null) {
					ShortUrl shortUrl = mapper.getByCodeAndPassword(shortUrlData);
					if (shortUrl != null) {
						mapper.addViewNumberById(shortUrl.getId());
						return Result.ok(URIUtil.encodeQuery(shortUrl.getLink()));
					} else {
						return Result.fail("密码错误");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Result.error("系统错误");
	}

}
