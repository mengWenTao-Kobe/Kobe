/*
Navicat MySQL Data Transfer

Source Server         : 孟文韬的数据库
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : sell

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2020-05-19 20:30:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `goodsname` varchar(100) DEFAULT NULL,
  `goodscategory` varchar(100) DEFAULT NULL,
  `goodsfeature` text,
  `imgUrl` text,
  `isPromotion` varchar(10) DEFAULT NULL,
  `standard` text,
  `goodsdesc` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '2020-04-07 22:48:33', '新商品', '烟酒类', '[\"第二单半价\",\"源自四川\"]', '1586270911907.jpg', '不促销', '[{\"goodsstandard\":\"单规格\",\"packingexpense\":2,\"goodsPrice\":18}]', '色分公司');
INSERT INTO `goods` VALUES ('2', '2020-04-09 12:02:58', '万色发', '凉菜', '[\"第二单半价\",\"源自四川\"]', '1586404962420.jpg', '促销', '[{\"goodsstandard\":\"小规格\",\"packingexpense\":1,\"goodsPrice\":1},{\"goodsstandard\":\"大规格\",\"packingexpense\":1,\"goodsPrice\":1},{\"goodsstandard\":\"中规格\",\"packingexpense\":2,\"goodsPrice\":10}]', '水电费水电费是');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNo` text,
  `orderTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` text,
  `consignee` varchar(50) DEFAULT NULL,
  `deliverAddress` text,
  `deliveryTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `remarks` text,
  `orderAmount` float(10,2) DEFAULT NULL,
  `orderState` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '008', '2020-04-10 00:42:35', '13198535081', '孟文韬', '四川省成都市高新区！！！', '2020-04-16 22:21:04', '这是一个大大滴备注哦', '77.00', '派送中');
INSERT INTO `orders` VALUES ('2', '2', '2020-04-10 00:42:09', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '20.00', '派送中');
INSERT INTO `orders` VALUES ('3', '3', '2020-04-10 00:42:13', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '30.00', '已完成');
INSERT INTO `orders` VALUES ('4', '4', '2020-04-10 00:42:14', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '50.00', '已受理');
INSERT INTO `orders` VALUES ('5', '5', '2020-04-10 00:42:16', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '40.00', '派送中');
INSERT INTO `orders` VALUES ('6', '6', '2020-04-10 00:42:20', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '18.00', '已完成');
INSERT INTO `orders` VALUES ('7', '002', '2020-04-10 00:42:24', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '37.00', '派送中');
INSERT INTO `orders` VALUES ('8', '001', '2020-04-10 00:42:30', '13198535081', '小貂蝉', '大邑', '2020-04-16 22:21:04', '备注', '45.00', '已受理');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopname` varchar(50) DEFAULT NULL,
  `address` text,
  `phone` text,
  `shopdesc` text,
  `slogan` text,
  `category` text,
  `feature` text,
  `packingexpense` text,
  `minprice` int(11) DEFAULT NULL,
  `date` text,
  `shopAvatar` text,
  `businessLicenseImg` text,
  `cateringServiceLicenseImg` text,
  `tableData` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('1', '店铺名被修改啦！！！', '天府新谷5号楼', '13198535081', '鸡中之王', '炸鸡中的战斗机', '川菜类', '[\"品质保证\",\"开发票\"]', '2', '10', '[\"2020-04-07 18:00:00\",\"2020-04-17 23:00:00\"]', '1586357053058.jpg', '1586357055869.jpg', '1586357064041.jpg', '优惠力度修改啦');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account` varchar(50) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `userGroup` varchar(30) DEFAULT NULL,
  `imgUrl` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=228 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('222', '2020-05-07 01:24:06', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('224', '2020-05-10 07:20:23', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('219', '2020-05-07 01:23:27', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('225', '2020-05-10 07:20:29', '小貂蝉', 'a666', '超级管理员', '1589732087349.JPG');
INSERT INTO `users` VALUES ('226', '2020-05-10 07:20:36', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('215', '2020-05-07 01:23:15', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('216', '2020-05-07 01:23:15', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('217', '2020-05-07 01:23:15', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('223', '2020-05-10 07:20:14', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('198', '2020-05-07 01:22:04', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('227', '2020-05-10 07:20:56', '扛把子', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('200', '2020-05-07 01:22:19', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('201', '2020-05-07 01:22:19', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('202', '2020-05-07 01:22:19', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('203', '2020-05-07 01:22:28', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('204', '2020-05-07 01:22:28', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('205', '2020-05-07 01:22:29', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('206', '2020-05-07 01:22:37', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('207', '2020-05-07 01:22:37', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('208', '2020-05-07 01:22:37', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('209', '2020-05-07 01:22:51', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('210', '2020-05-07 01:22:51', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('211', '2020-05-07 01:22:52', '小貂蝉', 'a666', '超级管理员', 'default.jpg');
INSERT INTO `users` VALUES ('212', '2020-05-07 01:23:04', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('213', '2020-05-07 01:23:04', '赵子龙', 'a666', '普通管理员', 'default.jpg');
INSERT INTO `users` VALUES ('214', '2020-05-07 01:23:04', '赵子龙', 'a666', '普通管理员', 'default.jpg');
