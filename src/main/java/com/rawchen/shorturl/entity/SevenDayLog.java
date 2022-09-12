package com.rawchen.shorturl.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

/**
 * @author RawChen
 * @since 2021-10-22 13:47
 */
public class SevenDayLog implements Serializable {

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date accessDate;

	private Integer accessValue;

	public Date getAccessDate() {
		return accessDate;
	}

	public void setAccessDate(Date accessDate) {
		this.accessDate = accessDate;
	}

	public Integer getAccessValue() {
		return accessValue;
	}

	public void setAccessValue(Integer accessValue) {
		this.accessValue = accessValue;
	}

	@Override
	public String toString() {
		return "SevenDayLog{" +
				"accessDate=" + accessDate +
				", accessValue=" + accessValue +
				'}';
	}
}
