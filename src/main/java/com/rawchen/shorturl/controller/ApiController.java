package com.rawchen.shorturl.controller;

import cn.hutool.core.util.URLUtil;
import com.rawchen.shorturl.entity.Result;
import com.rawchen.shorturl.entity.ShortUrl;
import com.rawchen.shorturl.mapper.UrlMapper;
import com.rawchen.shorturl.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author RawChen
 * @date 2022-03-30 17:49
 */
@Controller
public class ApiController {

	@Autowired
	private UrlMapper mapper;


	@PostMapping("/insert")
	@ResponseBody
	public Result insert(@RequestParam(name = "longurl") String longurl) {
		String tempUrl = URLUtil.encodeAll(longurl).trim();

		if ("".equals(tempUrl)) {
			return Result.fail("请填写URL链接");
		}

		if (!StringUtil.isUrl(longurl)) {
			return Result.fail("请正确填写URL链接");
		}

		try {
			ShortUrl shortUrl = mapper.getByLink(tempUrl);
			if (shortUrl != null) {
				//数据库已经存在相同link的短链接
				return Result.ok(shortUrl.getCode());
			} else {
				String code = StringUtil.getRandomStr(5);
				//数据库不存在给定的link的短链接，先检查下生成的编码是否有重复
				while (mapper.getByCode(code) != null) {
					//有重复重新生成编码
					code = StringUtil.getRandomStr(5);
				}
				mapper.insert(new ShortUrl(code, tempUrl));
				return Result.ok(code);
			}
		} catch (Exception e) {
			return Result.error("系统异常！");
		}
	}
}
