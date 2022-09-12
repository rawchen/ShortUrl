package com.rawchen.shorturl.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

public class Log implements Serializable {

    private Long id;

    private String browserName;

    private String osName;

    private String apiPath;

    private String ip;

    private String referer;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date accessTime;

    private Long shortUrlId;

    private String ua;

    private static final long serialVersionUID = 1L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrowserName() {
        return browserName;
    }

    public void setBrowserName(String browserName) {
        this.browserName = browserName == null ? null : browserName.trim();
    }

    public String getOsName() {
        return osName;
    }

    public void setOsName(String osName) {
        this.osName = osName == null ? null : osName.trim();
    }

    public String getApiPath() {
        return apiPath;
    }

    public void setApiPath(String apiPath) {
        this.apiPath = apiPath == null ? null : apiPath.trim();
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip == null ? null : ip.trim();
    }

    public String getReferer() {
        return referer;
    }

    public void setReferer(String referer) {
        this.referer = referer == null ? null : referer.trim();
    }

    public Date getAccessTime() {
        return accessTime;
    }

    public void setAccessTime(Date accessTime) {
        this.accessTime = accessTime;
    }

    public Long getShortUrlId() {
        return shortUrlId;
    }

    public void setShortUrlId(Long shortUrlId) {
        this.shortUrlId = shortUrlId;
    }

    public String getUa() {
        return ua;
    }

    public void setUa(String ua) {
        this.ua = ua == null ? null : ua.trim();
    }

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", browserName='" + browserName + '\'' +
                ", osName='" + osName + '\'' +
                ", apiPath='" + apiPath + '\'' +
                ", ip='" + ip + '\'' +
                ", referer='" + referer + '\'' +
                ", accessTime=" + accessTime +
                ", shortUrlId=" + shortUrlId +
                ", ua='" + ua + '\'' +
                '}';
    }
}