package com.rawchen.shorturl.mapper;

import com.rawchen.shorturl.entity.ShortUrl;
import org.apache.ibatis.annotations.Mapper;

/**
 * Mapper 接口
 *
 * @author RawChen
 * @date 2022-03-30 17:49
 */
@Mapper
public interface UrlMapper {

	ShortUrl getByLink(String link);

	ShortUrl getByCode(String code);

	void insert(ShortUrl shortUrl);
}
