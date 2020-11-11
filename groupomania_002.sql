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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.comlikes : ~1 rows (environ)
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.postlikes : ~1 rows (environ)
/*!40000 ALTER TABLE `postlikes` DISABLE KEYS */;
/*!40000 ALTER TABLE `postlikes` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `contenu` longtext NOT NULL,
  `dateCrea` datetime NOT NULL,
  `dateModif` datetime NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `fk_userId_posts` (`userId`),
  CONSTRAINT `fk_userId_posts` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=179 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.posts : ~8 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table groupomania. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `emailMask` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dateInscrip` datetime NOT NULL,
  `role` int(11) NOT NULL,
  `dateModif` datetime NOT NULL,
  `emailRec` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- Listage des données de la table groupomania.users : ~1 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `emailMask`, `password`, `dateInscrip`, `role`, `dateModif`, `emailRec`, `avatar`) VALUES
	(55, '63a77852a3a1352a9b97572728a21cc5cad9a37c02fbeb64b75577bef43e5f01fc8e55d9a64d26780f5cf21cade9d2b0c7e016dff104c5d7817dd7ad66818886450d9518c9cd4ab3e076a824c8668947b6d6e4d99fd7491dd4bb1bc202d34528ed1c553e081db6', '604d0ef601f7a8c48186a5514840f818f62d5238975312bcc1f7ec9feee75a5c5cc845ee032db2026b93361fdba8404a79c1d98b76eabc6aa88d62610b5dc130517c68e17ac49ec8d0494307f0875bce319a710c565ff8d6236e69173327b08bc35b646b2842c5', '742183e457f8b1bfec65e6987fbc88c2b8a8c813abfa92087cf5339e087e0fc7', 'la***************ia.fr', '$2b$10$DwmmEZJr7bhDU1BxjLdKuOPGF.YAGQ9uU8rJSdLrc5AZEUl75Bi.2', '2020-11-10 13:57:36', 1, '2020-11-10 18:27:51', '5a6cccc2041460dc9071730f604e9bf391256b9a218f0aa14bca22a65364804f3df6ac0b98e8e98a602b9f3044892a634145270d8e9ae438ef41981b88ebd6abb978b9fd8678bccf6c580e0b96126c83691fa3630447746b5eb13b8312f98d2c145a2f60ddc2ba4dcf4fee6203179dafbf34a6c5f474', 'http://localhost:3000/images/avatar/avatar_00.png'),
	(56, 'feb937152bc16d4b334242f60e107ab3e490d315894cbdb18c838a66511619357dd2009eb893f2157dfe64a50b119a9d774a0bc190565e1d4ee4c79a49a4a0df2b575a2cab2ccbc202eaacd2a445068f75d06acfd20d2fd0729b5d9a2ec576776925fb9e498387', '5dfde9d4eae462d267cb14e984952a9a6c8a483b56edc6bee92ffab02b58fb6f837f4b24f78219428d8c9b88b915ee418c88d999fa780e62c94a44f6951b167d31e98ddc5497858e9537ac05301f90cf3767ea5243c0c701e2a911d27c0cb40506d5d731e8', '7ebeb67575fe05dcc7d526dfe26617fbdc57fe92b56fcd806e5b291193280085', 'le*************ia.fr', '$2b$10$rqCPHc.7xlFAotVubT02oOZsC5m4myKO0FUlKoPtUnQ6gOURWEiZC', '2020-11-10 15:56:56', 2, '2020-11-10 15:56:56', 'c6896c61d0146de6a5273da3f9c7959bb4fc3bc228eddd7b72d1bb6c5c21fb3bfde88847e41eb4ea722ed70a48900098dca4ce4d375a42415679486c04c63f33dafbbffe27e9defc3507658cf88b7fdc403d4f4e8c958b498b44cd17378f013480afc274b3f3a13680a40d8981800dd36d12b350', 'http://localhost:3000/images/avatar/avatar_04.png');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
