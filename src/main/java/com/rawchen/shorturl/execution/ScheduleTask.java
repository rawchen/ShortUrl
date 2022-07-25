package com.rawchen.shorturl.execution;

import com.rawchen.shorturl.mapper.UrlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * Spring Boot定时任务
 *
 * @author RawChen
 * @date 2022-07-23 01:45
 */
@Component
@EnableScheduling
public class ScheduleTask {

	@Autowired
	private UrlMapper mapper;

	/**
	 * 每天1点执行扫描删除过期短链
	 * @throws Exception
	 */
	@Scheduled(cron = "0 0 1 * * ?")
	private void scanDeleteExpiredLink() throws Exception {
		mapper.scanDeleteExpiredLink();
	}
}
