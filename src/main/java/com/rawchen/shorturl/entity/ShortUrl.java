package com.rawchen.shorturl.entity;

/**
 * @author RawChen
 * @date 2022-03-30 22:01
 */
public class ShortUrl {

	private Long id;

	private String code;

	private String link;

	public ShortUrl() {
	}

	public ShortUrl(String code, String link) {
		this.code = code;
		this.link = link;
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

	@Override
	public String toString() {
		return "ShortUrl{" +
				"id=" + id +
				", code='" + code + '\'' +
				", link='" + link + '\'' +
				'}';
	}
}
