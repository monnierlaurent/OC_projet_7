-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.6.50-log - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour groupomania
CREATE DATABASE IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `groupomania`;

-- Listage de la structure de la table groupomania. comlikes
CREATE TABLE IF NOT EXISTS `comlikes` (
  `likeComId` int(11) NOT NULL AUTO_INCREMENT,
  `comId` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `comLikeValeur` int(11) NOT NULL,
  PRIMARY KEY (`likeComId`),
  KEY `fk_comLikes_userId` (`userid`),
  KEY `fk_comLikes_postId` (`comId`),
  CONSTRAINT `fk_comLikes_postId` FOREIGN KEY (`comId`) REFERENCES `coms` (`comId`) ON DELETE CASCADE,
  CONSTRAINT `fk_comLikes_userId` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.comlikes : ~0 rows (environ)
/*!40000 ALTER TABLE `comlikes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comlikes` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. coms
CREATE TABLE IF NOT EXISTS `coms` (
  `comId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `comContenu` longtext NOT NULL,
  `comDateCrea` datetime NOT NULL,
  `comDateModif` datetime NOT NULL,
  `comLikes` int(11) NOT NULL,
  `comDislikes` int(11) NOT NULL,
  PRIMARY KEY (`comId`),
  KEY `fk_coms_userId` (`userId`),
  KEY `fk_coms_postId` (`postId`),
  CONSTRAINT `fk_coms_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE,
  CONSTRAINT `fk_coms_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.coms : ~3 rows (environ)
/*!40000 ALTER TABLE `coms` DISABLE KEYS */;
/*!40000 ALTER TABLE `coms` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. postlikes
CREATE TABLE IF NOT EXISTS `postlikes` (
  `likePostId` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `postLikeValeur` int(11) NOT NULL,
  PRIMARY KEY (`likePostId`),
  KEY `fk_postLikes_userId` (`userId`),
  KEY `fk_postLikes_postId` (`postId`),
  CONSTRAINT `fk_postLikes_postId` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE,
  CONSTRAINT `fk_postLikes_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.postlikes : ~1 rows (environ)
/*!40000 ALTER TABLE `postlikes` DISABLE KEYS */;
/*!40000 ALTER TABLE `postlikes` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `userId` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` longtext NOT NULL,
  `dateCrea` datetime NOT NULL,
  `dateModif` datetime NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`postId`),
  KEY `fk_userId_posts` (`userId`),
  CONSTRAINT `fk_userId_posts` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.posts : ~1 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailMask` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dateInscrip` datetime NOT NULL,
  `role` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateModif` datetime NOT NULL,
  `emailRec` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.users : ~1 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`nom`, `prenom`, `email`, `emailMask`, `password`, `dateInscrip`, `role`, `id`, `dateModif`, `emailRec`) VALUES
	('a2b24130c4c5f6d1679cda3ae09e1c8cfcd39b489e225e6863f5dac7292584351316a813ddd472eebfd182057cc0076dcb82baa2212cda426dfa13f41e4eb5a85a14ebd4ba1859d796519e607e4680efa37d93a53415cb3ba98662325866ff363b5aed453cedb1', '3feb427991819d00386a2e3612ef26327c2c3ac272b2c998c0890162ac1d7d5b5cc3a0d6689bb7933a43d09d7cab2b648feae033ebf92c79feeea520711d7eaefd1dc9ad82e3c7ea1bfa0551f58ab224ba1bb9f4f945a50ba5bec1c8c3cb7682f851e8be1a90cc', '742183e457f8b1bfec65e6987fbc88c2b8a8c813abfa92087cf5339e087e0fc7', 'la***************ia.fr', '$2b$10$88wMDr5sG4RUYgsL4zrVZ.c6VgdfIEY5YFwvoVoqbZ4wGzfKQaOaS', '2020-11-05 14:56:18', 1, 36, '2020-11-05 14:56:18', '2c42878590346d800edda54e1c1c186334649848ee4a7cdf16a8d4b010ceb88d18eaf82bf5f92ca3315abb9e338cfa44ece3031d3d3956a1a039457b005b10488012580dca3d55deb6ed0c3e8ecbc85e20d5c15b3fbd3649f7422f432a2b50977d1662e76415bda34203aaba39fee5bfbe7ba3c2f0bb');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
