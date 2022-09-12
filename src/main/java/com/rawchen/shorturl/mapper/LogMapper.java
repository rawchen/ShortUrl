package com.rawchen.shorturl.mapper;

import com.rawchen.shorturl.entity.Log;
import org.apache.ibatis.annotations.Mapper;

/**
 * Mapper 接口
 *
 * @author RawChen
 * @date 2022-09-12 23:15
 */
@Mapper
public interface LogMapper {

	int insert(Log log);

}
