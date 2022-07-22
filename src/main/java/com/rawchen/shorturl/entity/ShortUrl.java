package com.rawchen.shorturl.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @author RawChen
 * @date 2022-03-30 22:01
 */
public class ShortUrl {

	private Long id;

	private String code;

	private String link;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date effectiveDate;

	private String password;

	public ShortUrl() {
	}

	public ShortUrl(String code, String link) {
		this.code = code;
		this.link = link;
	}

	public ShortUrl(String code, String link, Date effectiveDate, String password) {
		this.code = code;
		this.link = link;
		this.effectiveDate = effectiveDate;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public Date getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "ShortUrl{" +
				"id=" + id +
				", code='" + code + '\'' +
				", link='" + link + '\'' +
				", effectiveDate=" + effectiveDate +
				", password='" + password + '\'' +
				'}';
	}
}
