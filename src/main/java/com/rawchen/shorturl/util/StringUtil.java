package com.rawchen.shorturl.util;

import java.util.Random;
import java.util.regex.Pattern;

/**
 * @author RawChen
 * @date 2022-03-30 22:38
 */
public class StringUtil {

	static Random random = new Random();

	/**
	 * 根据0-9、A-Z、a-z随机组成字符串
	 *
	 * @param length
	 * @return
	 */
	public static String getRandomStr(int length) {
		//1-10		11-36		37-62
		//0-9		A-Z			a-z
		//48-57		65-90		97-122
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			//[1, 62]
			int ran = random.nextInt(62) + 1;
			if (ran > 36) {
				sb.append((char) (ran + 60));
			} else if (ran > 10) {
				sb.append((char) (ran + 54));
			} else {
				sb.append((char) (ran + 47));
			}
		}
		return sb.toString();
	}

	/**
	 * 根据0-9、A-Z、a-z随机组成字符串去除相似字符
	 *
	 * @param length
	 * @return
	 */
	public static String getRandomStrNoSimilar(int length) {
		//1-10		11-36		37-62
		//0-9		A-Z			a-z
		//48-57		65-90		97-122
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			//[1, 62]
			int ran = random.nextInt(62) + 1;

			while ("ilo".contains(String.valueOf((char) (ran + 60)))
					|| "CIJKLOPSUVWXYZ".contains(String.valueOf((char) (ran + 54)))
					|| "01".contains(String.valueOf((char) (ran + 47)))) {

				if (ran > 36) {
					// a-z
					System.out.println((char) (ran + 60));
				} else if (ran > 10) {
					// A-Z
					System.out.println((char) (ran + 54));
				} else {
					// 0-9
					System.out.println((char) (ran + 47));
				}
				ran = random.nextInt(62) + 1;
			}

			if (ran > 36) {
				sb.append((char) (ran + 60));
			} else if (ran > 10) {
				sb.append((char) (ran + 54));
			} else {
				sb.append((char) (ran + 47));
			}
		}
		return sb.toString();
	}

	/**
	 * 根据0-9、a-z随机组成字符串并去除相似字符
	 *
	 * @param length
	 * @return
	 */
	public static String getRandomStrNoCapitalLetter(int length) {
		//1-10		11-36		37-62
		//0-9		A-Z			a-z
		//48-57		65-90		97-122
		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++) {
			//[1, 62]
			int ran = random.nextInt(62) + 1;

			while ("ilo".contains(String.valueOf((char) (ran + 60)))
					|| "01".contains(String.valueOf((char) (ran + 47)))
					|| (ran >= 11 && ran <= 36)) {
				ran = random.nextInt(62) + 1;
			}

			if (ran > 36) {
				sb.append((char) (ran + 60));
			} else {
				sb.append((char) (ran + 47));
			}
		}
		return sb.toString();
	}

	public static boolean isUrl(String str) {
		if (str == null || "".equals(str)) {
			return false;
		}
		return Pattern.matches("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", str.trim());
    }
}
