-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 17, 2019 at 05:48 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopoly`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `created` datetime NOT NULL,
  `ordered` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `created`, `ordered`) VALUES
(1, '2019-11-20 23:54:32', NULL),
(2, '2019-11-20 23:59:32', NULL),
(5, '2019-11-21 02:22:38', NULL),
(6, '2019-11-21 05:30:10', '2019-12-10 06:25:15'),
(7, '2019-12-01 18:14:10', '2019-12-01 18:15:01'),
(8, '2019-12-01 18:18:21', '2019-12-01 18:19:19'),
(9, '2019-12-01 18:20:47', '2019-12-01 18:21:33'),
(10, '2019-12-10 06:28:40', '2019-12-10 07:03:48'),
(11, '2019-12-10 07:04:46', '2019-12-10 07:08:20'),
(12, '2019-12-10 14:14:56', '2019-12-10 14:18:36'),
(13, '2019-12-10 14:20:43', '2019-12-10 14:21:07'),
(14, '2019-12-10 14:25:34', '2019-12-10 14:29:12'),
(15, '2019-12-10 14:52:48', '2019-12-10 21:53:34'),
(16, '2019-12-10 21:55:38', '2019-12-11 07:13:13'),
(17, '2019-12-11 07:27:26', '2019-12-11 17:02:14'),
(18, '2019-12-11 13:15:43', NULL),
(19, '2019-12-12 13:31:54', '2019-12-13 15:26:30'),
(20, '2019-12-13 15:28:55', '2019-12-13 16:28:23'),
(21, '2019-12-13 18:01:18', '2019-12-16 19:06:23'),
(22, '2019-12-16 19:15:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `cart_id` mediumint(8) UNSIGNED NOT NULL,
  `item_id` smallint(5) UNSIGNED NOT NULL,
  `final_price` smallint(5) UNSIGNED NOT NULL,
  `quantity` tinyint(3) UNSIGNED NOT NULL,
  `added` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `item_id`, `final_price`, `quantity`, `added`, `updated`) VALUES
(1, 1, 1, 60, 1, '2019-11-20 23:58:25', '2019-11-21 07:58:25'),
(2, 1, 2, 60, 1, '2019-11-20 23:58:25', '2019-11-21 07:58:25'),
(3, 2, 3, 100, 1, '2019-11-21 00:04:17', '2019-11-21 08:04:17'),
(4, 2, 4, 100, 1, '2019-11-21 00:04:17', '2019-11-21 08:04:17'),
(5, 2, 5, 120, 1, '2019-11-21 00:04:17', '2019-11-21 08:04:17'),
(6, 2, 31, 50, 4, '2019-11-21 00:04:17', '2019-11-21 08:04:17'),
(7, 5, 29, 0, 2, '2019-11-21 02:22:38', '2019-11-21 10:22:38'),
(8, 5, 21, 350, 3, '2019-11-21 02:25:30', '2019-11-21 11:49:13'),
(9, 5, 22, 400, 1, '2019-11-21 02:33:56', '2019-11-21 10:33:56'),
(12, 6, 1, 60, 1, '2019-11-21 05:30:10', '2019-11-26 14:01:40'),
(13, 6, 9, 180, 2, '2019-11-21 06:38:11', '2019-11-26 12:58:34'),
(14, 6, 10, 180, 1, '2019-11-21 06:42:56', '2019-11-21 14:42:56'),
(15, 6, 11, 200, 1, '2019-11-21 13:52:08', '2019-11-21 21:52:08'),
(16, 7, 23, 150, 1, '2019-12-01 18:14:10', '2019-12-02 02:14:10'),
(17, 8, 24, 150, 1, '2019-12-01 18:18:21', '2019-12-02 02:18:21'),
(18, 9, 1, 60, 1, '2019-12-01 18:20:47', '2019-12-02 02:20:47'),
(19, 6, 2, 60, 1, '2019-12-03 10:36:56', '2019-12-03 18:36:56'),
(20, 10, 21, 350, 1, '2019-12-10 06:28:40', '2019-12-10 14:28:40'),
(21, 10, 22, 400, 1, '2019-12-10 07:00:35', '2019-12-10 15:00:35'),
(22, 10, 31, 50, 4, '2019-12-10 07:01:13', '2019-12-10 15:01:13'),
(23, 11, 32, 50, 1, '2019-12-10 07:04:46', '2019-12-10 15:04:46'),
(24, 11, 29, 0, 4, '2019-12-10 07:05:53', '2019-12-10 15:05:53'),
(25, 11, 30, 50, 1, '2019-12-10 07:06:04', '2019-12-10 15:06:04'),
(26, 12, 18, 300, 1, '2019-12-10 14:14:56', '2019-12-10 22:14:56'),
(27, 12, 19, 300, 1, '2019-12-10 14:15:33', '2019-12-10 22:15:33'),
(28, 12, 20, 320, 1, '2019-12-10 14:16:45', '2019-12-10 22:16:45'),
(29, 12, 2, 60, 2, '2019-12-10 14:18:11', '2019-12-10 22:18:11'),
(30, 13, 1, 60, 4, '2019-12-10 14:20:43', '2019-12-10 22:20:43'),
(31, 14, 23, 150, 1, '2019-12-10 14:25:34', '2019-12-10 22:25:34'),
(32, 14, 24, 150, 1, '2019-12-10 14:25:54', '2019-12-10 22:25:54'),
(33, 15, 12, 220, 1, '2019-12-10 14:52:48', '2019-12-10 22:52:48'),
(34, 16, 13, 220, 1, '2019-12-10 21:55:38', '2019-12-11 05:55:38'),
(35, 16, 14, 240, 1, '2019-12-10 23:45:21', '2019-12-11 07:45:21'),
(36, 16, 32, 200, 2, '2019-12-10 23:53:39', '2019-12-11 14:54:41'),
(37, 16, 31, 100, 3, '2019-12-11 06:18:28', '2019-12-11 14:41:18'),
(41, 17, 29, 0, 4, '2019-12-11 07:27:26', '2019-12-12 00:38:11'),
(45, 18, 24, 150, 4, '2019-12-11 15:33:07', '2019-12-11 23:33:44'),
(65, 19, 25, 200, 2, '2019-12-13 15:23:37', '2019-12-13 23:23:41'),
(70, 20, 32, 50, 2, '2019-12-13 16:25:33', '2019-12-14 00:25:44'),
(72, 21, 27, 200, 1, '2019-12-13 18:01:32', '2019-12-16 23:14:15'),
(73, 21, 26, 200, 1, '2019-12-13 18:01:55', '2019-12-17 02:10:17'),
(90, 22, 28, 200, 1, '2019-12-16 19:34:16', '2019-12-17 03:34:36');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `item_id` smallint(5) UNSIGNED NOT NULL,
  `url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `item_id`, `url`) VALUES
(1, 15, 'server/public/assets/images/properties/atlantic1.png'),
(2, 15, 'server/public/assets/images/properties/atlantic2.png'),
(3, 2, 'server/public/assets/images/properties/baltic1.png'),
(4, 2, 'server/public/assets/images/properties/baltic2.png'),
(5, 22, 'server/public/assets/images/properties/boardwalk1.png'),
(6, 22, 'server/public/assets/images/properties/boardwalk2.png'),
(7, 27, 'server/public/assets/images/properties/borr1.png'),
(8, 27, 'server/public/assets/images/properties/borr2.png'),
(9, 1, 'server/public/assets/images/properties/brownmort.png'),
(10, 2, 'server/public/assets/images/properties/brownmort.png'),
(11, 5, 'server/public/assets/images/properties/connecticut1.png'),
(12, 5, 'server/public/assets/images/properties/connecticut2.png'),
(13, 21, 'server/public/assets/images/properties/darkbluemort.png'),
(14, 22, 'server/public/assets/images/properties/darkbluemort.png'),
(15, 23, 'server/public/assets/images/properties/electricco1.png'),
(16, 23, 'server/public/assets/images/properties/electricco2.png'),
(17, 23, 'server/public/assets/images/properties/electricco3.png'),
(18, 29, 'server/public/assets/images/properties/freeparking1.png'),
(19, 29, 'server/public/assets/images/properties/freeparking2.png'),
(20, 29, 'server/public/assets/images/properties/freeparking3.jpg'),
(21, 29, 'server/public/assets/images/properties/freeparking4.jpg'),
(22, 18, 'server/public/assets/images/properties/greenmort.png'),
(23, 19, 'server/public/assets/images/properties/greenmort.png'),
(24, 20, 'server/public/assets/images/properties/greenmort.png'),
(25, 32, 'server/public/assets/images/properties/hotel1.jpg'),
(26, 32, 'server/public/assets/images/properties/hotel2.jpg'),
(27, 32, 'server/public/assets/images/properties/hotel3.jpg'),
(28, 32, 'server/public/assets/images/properties/hotel4.jpg'),
(29, 31, 'server/public/assets/images/properties/house1.jpg'),
(30, 31, 'server/public/assets/images/properties/house2.jpg'),
(31, 31, 'server/public/assets/images/properties/house3.jpeg'),
(32, 31, 'server/public/assets/images/properties/house4.jpg'),
(33, 14, 'server/public/assets/images/properties/illinois1.png'),
(34, 14, 'server/public/assets/images/properties/illinois2.png'),
(35, 13, 'server/public/assets/images/properties/indiana1.png'),
(36, 13, 'server/public/assets/images/properties/indiana2.png'),
(37, 30, 'server/public/assets/images/properties/jail1.jpg'),
(38, 30, 'server/public/assets/images/properties/jail2.jpg'),
(39, 30, 'server/public/assets/images/properties/jail3.jpg'),
(40, 30, 'server/public/assets/images/properties/jail4.jpg'),
(41, 12, 'server/public/assets/images/properties/kentucky1.png'),
(42, 12, 'server/public/assets/images/properties/kentucky2.png'),
(43, 3, 'server/public/assets/images/properties/lightbluemort.png'),
(44, 4, 'server/public/assets/images/properties/lightbluemort.png'),
(45, 5, 'server/public/assets/images/properties/lightbluemort.png'),
(46, 17, 'server/public/assets/images/properties/marvin1.png'),
(47, 17, 'server/public/assets/images/properties/marvin2.png'),
(48, 1, 'server/public/assets/images/properties/mediterranean1.png'),
(49, 1, 'server/public/assets/images/properties/mediterranean2.png'),
(50, 19, 'server/public/assets/images/properties/ncarolina1.png'),
(51, 19, 'server/public/assets/images/properties/ncarolina2.png'),
(52, 11, 'server/public/assets/images/properties/newyork1.png'),
(53, 11, 'server/public/assets/images/properties/newyork2.png'),
(54, 9, 'server/public/assets/images/properties/orangemort.png'),
(55, 10, 'server/public/assets/images/properties/orangemort.png'),
(56, 11, 'server/public/assets/images/properties/orangemort.png'),
(57, 3, 'server/public/assets/images/properties/oriental1.png'),
(58, 3, 'server/public/assets/images/properties/oriental2.png'),
(59, 18, 'server/public/assets/images/properties/pacific1.png'),
(60, 18, 'server/public/assets/images/properties/pacific2.png'),
(61, 21, 'server/public/assets/images/properties/parkplace1.png'),
(62, 21, 'server/public/assets/images/properties/parkplace2.png'),
(63, 26, 'server/public/assets/images/properties/pennrr1.png'),
(64, 26, 'server/public/assets/images/properties/pennrr2.png'),
(65, 20, 'server/public/assets/images/properties/pennsylvania1.png'),
(66, 20, 'server/public/assets/images/properties/pennsylvania2.png'),
(67, 6, 'server/public/assets/images/properties/pinkmort.png'),
(68, 7, 'server/public/assets/images/properties/pinkmort.png'),
(69, 8, 'server/public/assets/images/properties/pinkmort.png'),
(70, 25, 'server/public/assets/images/properties/readingrr1.png'),
(71, 25, 'server/public/assets/images/properties/readingrr2.png'),
(72, 12, 'server/public/assets/images/properties/redmort.png'),
(73, 13, 'server/public/assets/images/properties/redmort.png'),
(74, 14, 'server/public/assets/images/properties/redmort.png'),
(75, 25, 'server/public/assets/images/properties/rrmort.png'),
(76, 26, 'server/public/assets/images/properties/rrmort.png'),
(77, 27, 'server/public/assets/images/properties/rrmort.png'),
(78, 28, 'server/public/assets/images/properties/rrmort.png'),
(79, 28, 'server/public/assets/images/properties/shortlinerr1.png'),
(80, 28, 'server/public/assets/images/properties/shortlinerr2.png'),
(81, 7, 'server/public/assets/images/properties/states1.png'),
(82, 7, 'server/public/assets/images/properties/states2.png'),
(83, 6, 'server/public/assets/images/properties/stcharles1.png'),
(84, 6, 'server/public/assets/images/properties/stcharles2.png'),
(85, 9, 'server/public/assets/images/properties/stjames1.png'),
(86, 9, 'server/public/assets/images/properties/stjames2.png'),
(87, 10, 'server/public/assets/images/properties/tennessee1.png'),
(88, 10, 'server/public/assets/images/properties/tennessee2.png'),
(89, 16, 'server/public/assets/images/properties/ventnor1.png'),
(90, 16, 'server/public/assets/images/properties/ventnor2.png'),
(91, 4, 'server/public/assets/images/properties/vermont1.png'),
(92, 4, 'server/public/assets/images/properties/vermont2.png'),
(93, 8, 'server/public/assets/images/properties/virginia1.png'),
(94, 8, 'server/public/assets/images/properties/virginia2.png'),
(95, 24, 'server/public/assets/images/properties/waterworks1.png'),
(96, 24, 'server/public/assets/images/properties/waterworks2.png'),
(97, 24, 'server/public/assets/images/properties/waterworks3.png'),
(98, 15, 'server/public/assets/images/properties/yellowmort.png'),
(99, 16, 'server/public/assets/images/properties/yellowmort.png'),
(100, 17, 'server/public/assets/images/properties/yellowmort.png');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(40) NOT NULL,
  `lot_number` tinyint(4) NOT NULL,
  `price` varchar(16) NOT NULL,
  `rent` varchar(16) NOT NULL,
  `item_group` enum('Purple/Brown','Light Blue','Pink','Orange','Red','Yellow','Green','Dark Blue','Utility','Railroad','Other','Building') NOT NULL,
  `description1` text NOT NULL,
  `description2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `lot_number`, `price`, `rent`, `item_group`, `description1`, `description2`) VALUES
(1, 'Mediterranean Ave.', 2, '60', '2', 'Purple/Brown', 'Originally part of the Dark Purple property set, Brown\'s Mediterranean Avenue is the first property on a standard Monopoly board, and as such is impossible to land on before passing Go once. Mediterranean Avenue has the lowest rent in the game, but can be a fairly powerful tool. In the Mega Edition, its $750 rent maximum can be crippling.', 'Mediterranean, like Baltic Avenue, does not gain much rent easily. However, once hotels are built, they can be nasty surprises for those passing Go. These properties can also be crucial to causing a building shortage, due to their low building cost. According to analysis in The Monopoly Companion by Philip Orbanes, Mediterranean is visited the least of all spaces, partly due to the GO TO JAIL space, the effects of cards, and the impossibility of rolling a one. Max value: $310.'),
(2, 'Baltic Ave.', 4, '60', '4', 'Purple/Brown', 'Baltic Avenue is the third space and the second property on the Monopoly board. Its rents are usually double those of Mediterranean Avenue and, unlike Mediterranean, can be bought on the first turn. However, the odds of rolling a 3 are fairly low at 5.6%.', 'Baltic Avenue is altogether better than its counterpart, however, Mediterranean is still required for Baltic to reach its full potential. Baltic with a hotel is an even nastier surprise than Mediterranean, should an opponent hit it after passing Go. And even worse: Income Tax follows. The property has the 2nd highest value of any place when fully built, at 72.6%, barely behind Boardwalk at 72.7%. When the lower property only has 4 houses, it goes to 78.94%, with Boardwalk actually lower at 78.43%, making it the best precentage-wise with these settings (and only with it this way). Max value: $450.'),
(3, 'Oriental Ave.', 7, '100', '6', 'Light Blue', 'The first of the Light Blue properties, Oriental Avenue is a good deal. Vermont Avenue shares all monetary values exactly.', 'Oriental is more cost-effective than the brown properties, and can be even more instrumental in causing a housing shortage. Oriental has the second-highest ROI (return on investment) in the game with a hotel, tied with Vermont Avenue. You receive $550 with the hotel and you pay $350 to build it up ($100 to purchase it initially and $250 worth of improvements). That\'s a $200 profit and a 157% ROI.'),
(4, 'Vermont Ave.', 9, '100', '6', 'Light Blue', 'Vermont Avenue is the second of the Light Blue properties in Monopoly. Situated between Chance and Connecticut Avenue, it has the exact same prices and rents as Oriental Avenue.', 'Vermont, like Oriental, is a good deal and can decide a game. It is cheap, relatively inexpensive, and serves as a good source of cash once 1 hotel is built. Vermont has the second-highest ROI (return on investment) in the game with a hotel, tied with Oriental Avenue. You receive $550 with the hotel and you pay $350 to build it up ($100 to purchase it initially and $250 worth of improvements). That\'s a $200 profit and a 157% ROI.'),
(5, 'Connecticut Ave.', 10, '120', '8', 'Light Blue', 'Connecticut Avenue is the last of the Light Blue properties, and as such has slightly higher rents and prices than Oriental Avenue and Vermont Avenue. Due to the lower odds of rolling a 9, rather than a 6 or 8, Connecticut Avenue is the least likely of the Light Blues to be landed on in the first turn.', 'Connecticut is slightly higher in price than its neighbors, but with all 3 light blues, a game can go a lot faster. With a hotel, it has the highest ROI (return on investment) in the game. In order to build it up to a hotel, you must spend $370 ($120 to purchase it initially and $250 in improvements). If someone lands on it with a hotel, you receive $600. That\'s a $230 profit and a 162% ROI. Oriental and Vermont Avenues have a slightly less ROI, but are still amazing investments.'),
(6, 'St. Charles Place', 12, '140', '10', 'Pink', 'St. Charles Place is the first Pink property and the first property on the second side of the board. Alas, the real St. Charles Place no longer exists, as the Showboat Casino stands where it once was. St. Charles Place is the first property with a 2-digit rent and shares rental rates with States Avenue.', 'St. Charles is a good buy. Though more expensive than the Light Blue properties, it produces higher rents. $750 rents are no joke! Many tournaments have been decided by this property alone! Also, even though a 11 is not common, if Chance has the Advance to St. Charles Place card on it as a player comes from Go from rolling a 7 (the most common roll with 2 fair dice), they could still get hit hard if a hotel is there. Max value: $640.'),
(7, 'States Ave.', 14, '140', '10', 'Pink', 'States Avenue is the second of the Pink properties, and shares rents and prices with St. Charles Place. States Avenue is very small in Atlantic City today, but, unlike St. Charles, it\'s still there, at least part of it.', 'States is another good deal. Building houses is fairly cheap, and it can produce good rents. Max value: $640.'),
(8, 'Virginia Ave.', 15, '160', '12', 'Pink', 'Virginia Avenue is the last of the Pink properties and as such has slightly higher rents and prices than St. Charles Place and States Avenue. In Atlantic City, Virginia Avenue was the favorite place of the famous and nearly-famous.', 'The first properties on the 2nd side of the board, the Pink properties are higher in value - and expense - than those on the 1st side. According to analysis in The Monopoly Companion, the pink properties rank 4th out of 10 in payoff percentage, and 7th out of 10 in visitation frequency.'),
(9, 'St. James Place', 17, '180', '14', 'Orange', 'St. James Place is the first of the highly lucrative Orange properties, and itself has fairly high rents. Tennessee Avenue shares these rents.', 'This is considered one of the best properties in the game. $950 can be very crippling, and it\'s relatively inexpensive to build here. Orange properties should be acquired whenever possible, since the Orange properties are the most landed on in an average run around the board. This can be very pleasant when an opponent is in jail and either rolls double threes or rolls a six (two-die combination) and has to pay to get out. The more improvements there are, the better.'),
(10, 'Tennessee Ave.', 19, '180', '14', 'Orange', 'Like the other Orange properties, Tennessee Avenue is one of the best in the game. Being the second orange property, it shares values with St. James Place.', '$950 rents are no joke, and they can be collected frequently. This property is a must-buy. Orange properties should be acquired whenever possible, since the Orange properties are the most landed on in an average run around the board. This can be very pleasant when an opponent is in jail and either rolls double fours or rolls an eight (two-die combination) and has to pay to get out. The more improvements there are, the better.'),
(11, 'New York Ave.', 20, '200', '16', 'Orange', 'New York Avenue is the third Orange property and is one of the most landed-on in the game, partly due to the \'Go Back 3 Spaces\' card and its proximity to the Jail corner. As with the last properties of other groups, it has slightly higher values than its neighbors: St. James Place and Tennessee Avenue.', 'The Orange properties are great investments and this one is no exception; it is the first property on the track capable of generating four-digit rents and the first property to have a $100 mortgage value. Although it only makes $50 more than the other Orange properties, an extra $50 more each time it gets landed on can help in the long run. Orange properties should be acquired whenever possible, since the Orange properties are the most landed on in an average run around the board. This can be very pleasant when an opponent is in jail and rolls a nine (two-die combination) and has to pay to get out. This property is likely to be landed on from the nearby St. Charles Place, Electric Company, or States Avenue. Regardless of where an opponent is coming from, the more improvements there are on New York Avenue, the better.'),
(12, 'Kentucky Ave.', 22, '220', '18', 'Red', 'Kentucky Avenue is the first of the Red properties. It has higher risk but higher potential return than the Oranges, and can be key to winning.', 'The Reds are a good buy. Kentucky is not frequented as much as the other Reds, but can be a powerful force.'),
(13, 'Indiana Ave.', 24, '220', '18', 'Red', 'The second of the American Red Properties, Indiana Avenue shares values with Kentucky Avenue.', 'Indiana is the least landed-on of the Red Properties, but is a good buy. Try to cause $1050 rents before you pay them.'),
(14, 'Illinois Ave.', 25, '240', '20', 'Red', 'Illinois Avenue is the last of the red properties and is the most frequently landed on property in the game. As with other groups, its values are slightly higher than those of Kentucky Avenue and Indiana Avenue.', 'Like the Orange properties, this is a good deal. Though it is more expensive, a $1100 rent can be hard to pay. Buy and build wisely. Statistically speaking, players will land on Illinois Avenue more than any other property on the board (the next most frequently landed on spaces are B&O Railroad and Go).'),
(15, 'Atlantic Ave.', 27, '260', '22', 'Yellow', 'The first of the Yellow properties - and very possibly the most landed-on of them - is Atlantic Avenue. Though expensive, rents here can be high, if you\'ve got the money. Atlantic shares rent rates with Ventnor Avenue.', 'This is less valuable than the Reds or Oranges from a totally professional standpoint, but rents are fairly high even with just 3 houses.'),
(16, 'Ventnor Ave.', 28, '260', '22', 'Yellow', 'The second Yellow property, Ventnor Avenue lies three spaces from Go To Jail, and is possibly the least landed-on of the Yellows. It shares values with Atlantic Avenue.', 'The Yellow properties are landed on less than the Reds, and are more expensive, but can still produce high rents. They rank 6th out of 10 in payoff percentage and 4th out of 10 in visitation frequency.'),
(17, 'Marvin Gardens', 30, '280', '24', 'Yellow', 'The last of the Yellow properties, Marvin Gardens is the most expensive of the set. It is the only colored property that is not a street; it is a housing area outside of Atlantic City, New Jersey. It is also misspelled: the real place is Marven Gardens, not Marvin Gardens.', 'There are some special facts about this one. In the UK Version, rent is only &pound;22, and &pound;44 for a monopoly. It was $22 ($44 for a monopoly) in the original Atlantic City version until Parker Brothers changed it in the 1950s. Before then, it was the only exception to the pattern of the third property (second in the case of the Browns/Purples and Dark Blues) in a color group having the most expensive set of rents. It is also the first property that pays at least $1000 in rent with four houses.'),
(18, 'Pacific Ave.', 32, '300', '26', 'Green', 'The first of the Green Properties, Pacific Avenue is somewhat expensive. The rate of return on this property just doesn\'t compare to that of the Oranges or even the Light Blues.', 'Greens may have fairly high rents, but are incredibly expensive. Do NOT go after these in tournament play: use them as trading material.'),
(19, 'North Carolina Ave.', 33, '300', '26', 'Green', 'North Carolina Avenue is a Green property that was originally going to be named South Carolina Avenue, but was changed by Charles Todd for unknown reasons. However, South Carolina Avenue is a property in the Mega Edition. It shares values with Pacific Avenue.', 'The exact same as Pacific Avenue, though it may be landed on less. The Green Properties are the most expensive to develop fully. They are the first properties on the 4th side of the board. They rank 8th out of 10 in payoff percentage and 5th in visitation frequency. They rarely produce tournament winners, though you should not be discouraged from buying them.'),
(20, 'Pennsylvania Ave.', 35, '320', '28', 'Green', 'Like the other groups, Pennsylvania Avenue has higher values than other properties in its color group, Pacific Avenue and North Carolina Avenue. It is the third most expensive property on a standard board.', 'This is the first property with 4-digit rents with only three houses. Regarding ROI (return on investment), Pennsylvania has the highest ROI with three houses at 108.7%. In other words, building up to either four houses or a hotel is not worth it. The extra improvements are going to get you little back. Also, those improvements are expensive at $200 each. Overall, it has higher ROI rates than the other two Greens.'),
(21, 'Park Place', 38, '350', '35', 'Dark Blue', 'Park Place is the second most expensive property, and consequently has the second highest rents and mortgage value. It is among the properties landed on the least, and is actually a small place in Atlantic City. At the corner of Park Place and Boardwalk in Atlantic City stands a plaque commemorating Charles Darrow.', 'This is a very good property and has greatly helped win several games. $1500 rent is incredible, so cause it before you have to pay it! Be careful, however; if no one actually lands on Park Place and you\'ve put a lot of money into it, it can come back to bite you! However, you can easily make a killing if you\'ve managed to build a hotel on Park Place and someone happens to stop by!'),
(22, 'Boardwalk', 40, '400', '50', 'Dark Blue', 'Boardwalk is the most expensive property on a standard Monopoly Board, and the highest in rent revenue. The name was inspired by Atlantic City Boardwalk in New Jersey and it is typically the most desired property in the US Monopoly game.', 'Located between the Go and Luxury Tax spaces, Boardwalk pairs with Park Place to complete the Dark Blue property set. Although it\'s the most expensive property to rent on the entire board, it\'s cheaper to upgrade than any of the Green Properties because there are only two Dark Blues instead of three. For every hotel rented on Boardwalk, the owner receives $2,000.'),
(23, 'Electric Company', 13, '150', 'Variable', 'Utility', 'The Electric Company is one of two Utilities in Monopoly, situated between St. Charles Place and States Avenue. It is among the cheapest properties, and buildings can\'t be placed on it.', 'If one Utility is owned, rent is 4x the number on the dice which landed the player on the utility, but if both Utilities are owned, rent is 10x the amount shown on the dice. The Electric Company will not make you rich; the average rent is only $28 ($70 if you also own Water Works). However, it is quick to pay for itself - once three players have landed on it, average rent plus the mortgage value exceeds your initial investment - so it is still worth buying if you get the chance.'),
(24, 'Water Works', 29, '150', 'Variable', 'Utility', 'Water Works is the second of the two Utilities, and has the exact same values as the Electric Company, the only difference being position. Interesting to note is that the Electric Company. is 2 spaces away from Jail, and Water Works is 2 spaces away from Go To Jail.', 'If one Utility is owned, rent is 4x the number on the dice which landed the player on the utility, but if both Utilities are owned, rent is 10x the amount shown on the dice. The only thing different from the Electric Company is position on the board. The average rent is only $28 ($70 if you also own the Electric Company). However, it is quick to pay for itself - once three players have landed on it, the rent plus the mortgage value exceeds your initial investment - so it is still worth buying if you get the chance.'),
(25, 'Reading Railroad', 6, '200', '25', 'Railroad', 'In the standard US version of Monopoly, Reading Railroad is the first of four Railroads. This Railroad lies between the Income Tax and Oriental Avenue spaces, and costs $200, which is the standard Railroad price. Contrary to popular opinion, it is actually pronounced REDD-ing (after the city in Pennsylvania where it was based) Railroad instead of REED-ing Railroad.', 'The four Railroads are fairly lucrative properties. They have the highest visitation frequency (64%) and rank 7th out of 10 in payoff percentage. Rent starts at $25, then doubles for every other Railroad owned on the board. The Railroads are extremely good to own. They are a steady source of cash and can temporarily stop an opponent from building with all 4 of them together. Due to their positioning (5th position on each side of the board), one is always at risk for landing on a railroad whether via dice roll or by a Chance/Community Chest card.'),
(26, 'Pennsylvania Railroad', 16, '200', '25', 'Railroad', 'On a standard US Monopoly board, Pennsylvania Railroad is the second of the Railroads players will come across. It is situated between Virginia Avenue and St. James Place.', 'The four Railroads are fairly lucrative properties. They have the highest visitation frequency (64%) and rank 7th out of 10 in payoff percentage. Rent starts at $25, then doubles for every other Railroad owned on the board. The Railroads are extremely good to own. They are a steady source of cash and can temporarily stop an opponent from building with all 4 of them together. Due to their positioning (5th position on each side of the board), one is always at risk for landing on a railroad whether via dice roll or by a Chance/Community Chest card.'),
(27, 'B. & O. Railroad', 26, '200', '25', 'Railroad', 'B. & O. Railroad, short for the Baltimore & Ohio Railroad, is the third Railroad on a standard Monopoly Board. It is situated between Illinois Avenue and Atlantic Avenue.', 'The four Railroads are fairly lucrative properties. They have the highest visitation frequency (64%) and rank 7th out of 10 in payoff percentage. Rent starts at $25, then doubles for every other Railroad owned on the board. The Railroads are extremely good to own. They are a steady source of cash and can temporarily stop an opponent from building with all 4 of them together. Due to their positioning (5th position on each side of the board), one is always at risk for landing on a railroad whether via dice roll or by a Chance/Community Chest card.'),
(28, 'Short Line Railroad', 36, '200', '25', 'Railroad', 'Short Line is one of the four Railroads in the standard US board and is placed between Chance and Pennsylvania Avenue. It is based on the historic Shore Fast Line.', 'The four Railroads are fairly lucrative properties. They have the highest visitation frequency (64%) and rank 7th out of 10 in payoff percentage. Rent starts at $25, then doubles for every other Railroad owned on the board. The Railroads are extremely good to own. They are a steady source of cash and can temporarily stop an opponent from building with all 4 of them together. Due to their positioning (5th position on each side of the board), one is always at risk for landing on a railroad whether via dice roll or by a Chance/Community Chest card.'),
(29, 'Free Parking', 21, '0', '0', 'Other', 'Free Parking is a corner square on the board diagonally opposite to Go. When a player lands here nothing happens and they move off the space on their next turn. The only exception is in the Monopoly City version, where landing on the space grants the player the \'Rent Dodge\' card, regardless of if another player has it or not.', 'Many house rules have cropped up over the years regarding this corner square; some of the simplest involve placing a $50 note under the square, which goes to the first player to land there. In some variations, the first note is a $1; when this is claimed it is replaced by a $5 and so on. It is important to remember that these are all House Rule variants and not official to any known Hasbro version of the game.'),
(30, 'Get Out of Jail', 31, '50', '0', 'Other', 'Jail is one of the four corner spaces on a Monopoly Board. If in Jail, a player\'s turn is suspended until either the player rolls a double or pays to get out. If a player is \'Just Visiting\', the Jail space is considered a \'safe\' space, where nothing happens. The character on the square is Jake the Jailbird.', 'There is one Get out of Jail Free card in both the Chance and Community Chest. Any player can use this to leave jail on their turn. They would have to put the card at the bottom of the stack of cards and roll the dice. Also, if a player gets this card, they may keep it until they use it or they can sell it for whatever the market will bear. This card has a value of $50.'),
(31, 'House', -1, '50-200', 'Variable', 'Building', 'Houses are the little green buildings (that look like houses) that are used in Monopoly. The cost for a house differs from each property. Houses can only be bought when all of the spaces in the monopoly are owned by the same player.', 'The purpose of houses and hotels is to increase the rent of a property. This is the most evident and easiest way to win Monopoly (be the richest player). The more houses, the higher the rent rises. Before a property can be mortgaged or traded, any buildings on it must be sold back to The Bank for one half of the cost to erect it.'),
(32, 'Hotel', -1, '50-200', 'Variable', 'Building', 'Hotels are buildings that give the property the most cash possible for the player. A hotel costs the same as a house but 4 houses are needed to build a hotel. They command better rents for nearly all properties.', 'The purpose of houses and hotels is to increase the rent of a property. This is the most evident and easiest way to win Monopoly (be the richest player). The more houses, the higher the rent rises. Before a property can be mortgaged or traded, any buildings on it must be sold back to The Bank for one half of the cost to erect it.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `same_cart_item_id` (`cart_id`,`item_id`),
  ADD KEY `cart_items_item_id` (`item_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_item_id` (`item_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  ADD CONSTRAINT `cart_items_item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_item_id` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
