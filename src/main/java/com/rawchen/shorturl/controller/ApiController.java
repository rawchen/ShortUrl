package com.rawchen.shorturl.controller;

import cn.hutool.core.util.StrUtil;
import com.rawchen.shorturl.DTO.ShortUrlDTO;
import com.rawchen.shorturl.entity.Result;
import com.rawchen.shorturl.entity.ShortUrl;
import com.rawchen.shorturl.limit.RateLimit;
import com.rawchen.shorturl.mapper.UrlMapper;
import com.rawchen.shorturl.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * @author RawChen
 * @date 2022-03-30 17:49
 */
@Controller
public class ApiController {

	@Autowired
	private UrlMapper mapper;

	@RateLimit(name = "新增短链接口", perSecond = 0.1) //默认1秒进0.1个令牌
	@PostMapping("/insert")
	@ResponseBody
	public Result insert(HttpServletRequest request, @RequestBody ShortUrlDTO dto) {
		try {
			if (dto == null)
				return Result.fail("请勿直接访问");
			if (StrUtil.isBlank(dto.getLongUrl()))
				return Result.fail("请填写URL链接");

			String tempUrl = dto.getLongUrl().trim();
			String password = "";

			if (!StringUtil.isUrl(tempUrl)) {
				return Result.fail("请正确填写URL链接");
			}

			if (StrUtil.isBlank(dto.getPassword())) {
				dto.setPassword(null);
			} else {
				password = dto.getPassword().trim();
			}

			//如果有填写过期时间，则重新生成新的不重复短链
			if (dto.getEffectiveDate() != null || !StrUtil.isBlank(password)) {
				String code = StringUtil.getRandomStrNoCapitalLetter(5);
				//数据库不存在给定的link的短链接，先检查下生成的编码是否有重复
				while (mapper.getByCode(code) != null) {
					//有重复重新生成编码
					code = StringUtil.getRandomStrNoCapitalLetter(5);
				}
				mapper.insert(new ShortUrl(code, tempUrl,
						dto.getEffectiveDate(), dto.getPassword(),
						StringUtil.getIpAddr(request)));
				return Result.ok(code);
			}

			//没填过期日期，一般短链，如果重复就使用数据库的
			ShortUrl shortUrl = mapper.getByLink(tempUrl);
			if (shortUrl != null) {
				//数据库已经存在相同link的短链接
				return Result.ok(shortUrl.getCode());
			} else {
				String code = StringUtil.getRandomStrNoCapitalLetter(5);
				//数据库不存在给定的link的短链接，先检查下生成的编码是否有重复
				while (mapper.getByCode(code) != null) {
					//有重复重新生成编码
					code = StringUtil.getRandomStrNoCapitalLetter(5);
				}
				mapper.insert(new ShortUrl(code, tempUrl, StringUtil.getIpAddr(request)));
				return Result.ok(code);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return Result.error(e.getMessage());
		}
	}
}
