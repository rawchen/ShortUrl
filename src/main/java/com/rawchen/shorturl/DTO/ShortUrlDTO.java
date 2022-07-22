package com.rawchen.shorturl.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * @author RawChen
 * @date 2022-07-23 02:28
 */
public class ShortUrlDTO {

	private String longUrl;

	@JsonFormat(pattern = "yyyy/MM/dd")
	private Date effectiveDate;

	private String password;

	public ShortUrlDTO() {
	}

	public ShortUrlDTO(String longUrl, Date effectiveDate, String password) {
		this.longUrl = longUrl;
		this.effectiveDate = effectiveDate;
		this.password = password;
	}

	public String getLongUrl() {
		return longUrl;
	}

	public void setLongUrl(String longUrl) {
		this.longUrl = longUrl;
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
		return "ShortUrlDTO{" +
				"longUrl='" + longUrl + '\'' +
				", effectiveDate=" + effectiveDate +
				", password='" + password + '\'' +
				'}';
	}
}
