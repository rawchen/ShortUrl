/*
 Navicat Premium Data Transfer

 Source Server         : short_url
 Source Server Type    : MySQL
 Source Server Version : 50734
 Source Host           : 127.0.0.1:3306
 Source Schema         : short_url

 Target Server Type    : MySQL
 Target Server Version : 50734
 File Encoding         : 65001

 Date: 12/08/2022 22:35:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for short_url
-- ----------------------------
DROP TABLE IF EXISTS `short_url`;
CREATE TABLE `short_url`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `effective_date` date NULL DEFAULT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
