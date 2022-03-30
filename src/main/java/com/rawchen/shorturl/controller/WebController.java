package com.rawchen.shorturl.controller;

import cn.hutool.core.util.URLUtil;
import com.rawchen.shorturl.entity.ShortUrl;
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

	@RequestMapping("/{code}")
	public String toLink(@PathVariable String code) {
		ShortUrl shortUrl = mapper.getByCode(code);
		if (shortUrl != null) {
			return "redirect:" + URLUtil.decode(shortUrl.getLink());
		} else {
			return "redirect:" + "/404";
		}
	}
}
