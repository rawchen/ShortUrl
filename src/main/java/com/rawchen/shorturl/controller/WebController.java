package com.rawchen.shorturl.controller;

import com.rawchen.shorturl.entity.ShortUrl;
import com.rawchen.shorturl.limit.RateLimit;
import com.rawchen.shorturl.mapper.UrlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

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
	public String toLink(@PathVariable String code) {
		ShortUrl shortUrl = mapper.getByCode(code);
		if (shortUrl != null) {
//			return "redirect:" + URLUtil.decode(shortUrl.getLink());
			shortUrl.setLink(shortUrl.getLink().replaceAll("%3F", "?"));
			return "redirect:" + shortUrl.getLink();
		} else {
			return "redirect:" + "/404";
		}
	}
}
