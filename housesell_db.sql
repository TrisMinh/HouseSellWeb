-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2026 at 10:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `housesell_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts_userprofile`
--

CREATE TABLE `accounts_userprofile` (
  `id` bigint(20) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `address` longtext DEFAULT NULL,
  `bio` longtext DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `accounts_userprofile`
--

INSERT INTO `accounts_userprofile` (`id`, `phone`, `avatar`, `address`, `bio`, `created_at`, `updated_at`, `user_id`) VALUES
(1, NULL, '', NULL, NULL, '2026-04-07 00:30:20.733636', '2026-04-07 00:59:09.201314', 1),
(2, NULL, '', NULL, NULL, '2026-04-07 00:40:38.195300', '2026-04-07 00:40:38.198387', 2),
(3, '0900000001', '', '1 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 1. [direct-load-vietnam]', '2026-04-07 08:24:39.680013', '2026-04-07 08:24:39.685075', 3),
(4, '0900000002', '', '2 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 2. [direct-load-vietnam]', '2026-04-07 08:24:39.882327', '2026-04-07 08:24:39.886883', 4),
(5, '0900000003', '', '3 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 3. [direct-load-vietnam]', '2026-04-07 08:24:40.087284', '2026-04-07 08:24:40.088282', 5),
(6, '0900000004', '', '4 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 4. [direct-load-vietnam]', '2026-04-07 08:24:40.314217', '2026-04-07 08:24:40.320860', 6),
(7, '0900000005', '', '5 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 5. [direct-load-vietnam]', '2026-04-07 08:24:40.549518', '2026-04-07 08:24:40.551518', 7),
(8, '0900000006', '', '6 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 6. [direct-load-vietnam]', '2026-04-07 08:24:40.748531', '2026-04-07 08:24:40.750558', 8),
(9, '0900000007', '', '7 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 7. [direct-load-vietnam]', '2026-04-07 08:24:40.962134', '2026-04-07 08:24:40.963378', 9),
(10, '0900000008', '', '8 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 8. [direct-load-vietnam]', '2026-04-07 08:24:41.180557', '2026-04-07 08:24:41.181558', 10),
(11, '0900000009', '', '9 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 9. [direct-load-vietnam]', '2026-04-07 08:24:41.351281', '2026-04-07 08:24:41.351795', 11),
(12, '0900000010', '', '10 Data Street, Ho Chi Minh City', 'Direct MySQL imported user 10. [direct-load-vietnam]', '2026-04-07 08:24:41.568997', '2026-04-07 08:24:41.570842', 12);

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `user_id` char(36) NOT NULL,
  `specialization` varchar(200) DEFAULT NULL,
  `experience_years` tinyint(4) DEFAULT 0,
  `total_listings` int(11) DEFAULT 0,
  `avg_rating` decimal(3,2) DEFAULT 0.00,
  `total_reviews` int(11) DEFAULT 0,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `property_id` char(36) NOT NULL,
  `buyer_id` char(36) NOT NULL,
  `seller_id` char(36) NOT NULL,
  `scheduled_at` datetime NOT NULL,
  `status` varchar(30) DEFAULT 'pending',
  `is_custom_request` tinyint(1) DEFAULT 0,
  `seller_feedback` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `appointments_appointment`
--

CREATE TABLE `appointments_appointment` (
  `id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `name` varchar(150) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `message` longtext DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `property_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointments_appointment`
--

INSERT INTO `appointments_appointment` (`id`, `date`, `time`, `name`, `phone`, `message`, `status`, `created_at`, `updated_at`, `property_id`, `user_id`) VALUES
(1, '2026-02-27', '18:30:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.955566', '2026-04-07 08:24:41.955566', 3, 10),
(2, '2026-04-03', '12:45:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.957562', '2026-04-07 08:24:41.957562', 46, 6),
(3, '2026-03-16', '11:45:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.958637', '2026-04-07 08:24:41.958637', 2, 11),
(4, '2026-03-17', '12:15:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.958637', '2026-04-07 08:24:41.958637', 71, 12),
(5, '2026-03-13', '09:15:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.958637', '2026-04-07 08:24:41.958637', 50, 11),
(6, '2026-03-04', '15:00:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.958637', '2026-04-07 08:24:41.958637', 4, 3),
(7, '2026-03-20', '11:30:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.960142', '2026-04-07 08:24:41.960142', 55, 12),
(8, '2026-03-25', '12:45:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.960142', '2026-04-07 08:24:41.960142', 99, 3),
(9, '2026-03-01', '17:45:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.960142', '2026-04-07 08:24:41.960142', 95, 11),
(10, '2026-02-27', '16:45:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.960142', '2026-04-07 08:24:41.960142', 79, 8),
(11, '2026-03-04', '16:15:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.960142', '2026-04-07 08:24:41.960142', 57, 6),
(12, '2026-03-25', '11:00:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.961656', '2026-04-07 08:24:41.961656', 29, 8),
(13, '2026-02-27', '15:30:00.000000', 'Mysql07 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.961656', '2026-04-07 08:24:41.961656', 85, 9),
(14, '2026-03-11', '17:30:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.962168', '2026-04-07 08:24:41.962168', 13, 4),
(15, '2026-03-07', '16:45:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.962168', '2026-04-07 08:24:41.962168', 54, 6),
(16, '2026-03-15', '16:30:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.962168', '2026-04-07 08:24:41.962168', 92, 6),
(17, '2026-03-11', '17:15:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Giao d?ch ?? ho?n t?t.', 'completed', '2026-04-07 08:24:41.962168', '2026-04-07 08:24:41.962168', 24, 5),
(18, '2026-04-16', '08:30:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.963174', '2026-04-07 08:24:41.963174', 10, 4),
(19, '2026-04-14', '09:15:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.963174', '2026-04-07 08:24:41.963174', 29, 8),
(20, '2026-04-18', '17:30:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.963174', '2026-04-07 08:24:41.963174', 61, 3),
(21, '2026-04-15', '14:15:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.964171', '2026-04-07 08:24:41.964171', 60, 12),
(22, '2026-04-20', '08:45:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.964171', '2026-04-07 08:24:41.964171', 10, 5),
(23, '2026-04-27', '10:15:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.964171', '2026-04-07 08:24:41.964171', 8, 12),
(24, '2026-03-21', '18:30:00.000000', 'Mysql07 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.965178', '2026-04-07 08:24:41.965178', 8, 9),
(25, '2026-04-19', '15:45:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.965178', '2026-04-07 08:24:41.965178', 56, 8),
(26, '2026-04-11', '13:00:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.965178', '2026-04-07 08:24:41.965178', 99, 4),
(27, '2026-04-16', '10:15:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.965178', '2026-04-07 08:24:41.965178', 83, 11),
(28, '2026-04-08', '10:45:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.965178', '2026-04-07 08:24:41.965178', 3, 7),
(29, '2026-04-06', '17:00:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.966683', '2026-04-07 08:24:41.966683', 14, 6),
(30, '2026-04-13', '14:00:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.966683', '2026-04-07 08:24:41.966683', 98, 12),
(31, '2026-04-12', '11:15:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.967193', '2026-04-07 08:24:41.967193', 12, 12),
(32, '2026-04-10', '16:15:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.967193', '2026-04-07 08:24:41.967193', 20, 8),
(33, '2026-04-17', '09:00:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.967193', '2026-04-07 08:24:41.967193', 6, 3),
(34, '2026-04-10', '11:45:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.968203', '2026-04-07 08:24:41.968203', 72, 11),
(35, '2026-03-22', '18:45:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.968203', '2026-04-07 08:24:41.968203', 54, 5),
(36, '2026-04-12', '13:15:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.968203', '2026-04-07 08:24:41.968203', 55, 7),
(37, '2026-04-18', '14:15:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 88, 6),
(38, '2026-04-21', '14:00:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 15, 11),
(39, '2026-04-21', '10:15:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 64, 3),
(40, '2026-04-05', '15:30:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 62, 3),
(41, '2026-04-17', '08:15:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 73, 8),
(42, '2026-04-24', '13:00:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 33, 12),
(43, '2026-04-19', '12:30:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 77, 12),
(44, '2026-04-14', '17:00:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 59, 11),
(45, '2026-04-25', '08:15:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.969208', '2026-04-07 08:24:41.969208', 77, 3),
(46, '2026-03-27', '10:30:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.971577', '2026-04-07 08:24:41.971577', 69, 6),
(47, '2026-04-25', '10:30:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.971577', '2026-04-07 08:24:41.971577', 46, 7),
(48, '2026-04-18', '11:45:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.972157', '2026-04-07 08:24:41.972157', 29, 8),
(49, '2026-04-23', '12:00:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.972157', '2026-04-07 08:24:41.972157', 59, 7),
(50, '2026-04-18', '10:30:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.973437', '2026-04-07 08:24:41.973437', 88, 5),
(51, '2026-04-24', '11:00:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.973437', '2026-04-07 08:24:41.973437', 79, 4),
(52, '2026-04-08', '14:45:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.973942', '2026-04-07 08:24:41.973942', 36, 10),
(53, '2026-03-13', '11:15:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.973942', '2026-04-07 08:24:41.973942', 81, 3),
(54, '2026-04-26', '08:15:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.973942', '2026-04-07 08:24:41.973942', 60, 8),
(55, '2026-04-16', '09:45:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.974857', '2026-04-07 08:24:41.974857', 13, 12),
(56, '2026-04-24', '11:15:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.974857', '2026-04-07 08:24:41.974857', 92, 12),
(57, '2026-03-22', '15:00:00.000000', 'Mysql07 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.974857', '2026-04-07 08:24:41.975362', 95, 9),
(58, '2026-04-14', '09:30:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.975362', '2026-04-07 08:24:41.975362', 5, 4),
(59, '2026-04-23', '14:00:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.975362', '2026-04-07 08:24:41.975362', 11, 8),
(60, '2026-04-12', '17:45:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.975362', '2026-04-07 08:24:41.975362', 32, 6),
(61, '2026-04-24', '10:30:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.975362', '2026-04-07 08:24:41.975362', 1, 8),
(62, '2026-04-08', '08:15:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.976453', '2026-04-07 08:24:41.976453', 51, 6),
(63, '2026-04-23', '18:00:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.976453', '2026-04-07 08:24:41.976453', 52, 11),
(64, '2026-04-06', '16:30:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.976453', '2026-04-07 08:24:41.976453', 27, 7),
(65, '2026-04-24', '14:30:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.976453', '2026-04-07 08:24:41.976453', 98, 10),
(66, '2026-04-02', '08:30:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.976453', '2026-04-07 08:24:41.976453', 22, 6),
(67, '2026-04-15', '12:15:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.976453', '2026-04-07 08:24:41.976453', 98, 6),
(68, '2026-04-13', '14:00:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.977890', '2026-04-07 08:24:41.977890', 16, 7),
(69, '2026-04-24', '17:30:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.978396', '2026-04-07 08:24:41.978396', 16, 7),
(70, '2026-04-11', '14:30:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.978396', '2026-04-07 08:24:41.978396', 1, 5),
(71, '2026-04-17', '08:30:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.978396', '2026-04-07 08:24:41.978396', 71, 10),
(72, '2026-04-10', '14:15:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.978396', '2026-04-07 08:24:41.978396', 29, 4),
(73, '2026-03-31', '17:45:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.979536', '2026-04-07 08:24:41.979536', 77, 7),
(74, '2026-03-11', '10:00:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.979536', '2026-04-07 08:24:41.979536', 6, 3),
(75, '2026-04-09', '12:30:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.979536', '2026-04-07 08:24:41.979536', 96, 4),
(76, '2026-04-22', '16:30:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.980542', '2026-04-07 08:24:41.980542', 51, 11),
(77, '2026-04-26', '13:45:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.980542', '2026-04-07 08:24:41.980542', 95, 5),
(78, '2026-04-10', '14:15:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.980542', '2026-04-07 08:24:41.980542', 24, 5),
(79, '2026-04-22', '18:45:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.980542', '2026-04-07 08:24:41.980542', 54, 4),
(80, '2026-04-20', '11:30:00.000000', 'Mysql07 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.981542', '2026-04-07 08:24:41.981542', 3, 9),
(81, '2026-04-27', '08:45:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.981542', '2026-04-07 08:24:41.981542', 98, 3),
(82, '2026-04-14', '09:30:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.982047', '2026-04-07 08:24:41.982047', 40, 10),
(83, '2026-04-27', '08:45:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.982563', '2026-04-07 08:24:41.982563', 28, 5),
(84, '2026-04-14', '14:15:00.000000', 'Mysql06 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.982563', '2026-04-07 08:24:41.982563', 26, 8),
(85, '2026-04-19', '15:15:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.982563', '2026-04-07 08:24:41.982563', 5, 7),
(86, '2026-04-08', '08:45:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.982563', '2026-04-07 08:24:41.982563', 42, 3),
(87, '2026-04-23', '18:30:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.982563', '2026-04-07 08:24:41.982563', 61, 11),
(88, '2026-04-11', '11:00:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.983821', '2026-04-07 08:24:41.983821', 38, 5),
(89, '2026-04-11', '11:15:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.983821', '2026-04-07 08:24:41.983821', 16, 5),
(90, '2026-03-12', '15:15:00.000000', 'Mysql03 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.983821', '2026-04-07 08:24:41.983821', 1, 5),
(91, '2026-04-14', '13:00:00.000000', 'Mysql01 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.983821', '2026-04-07 08:24:41.983821', 99, 3),
(92, '2026-04-19', '09:00:00.000000', 'Mysql02 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.984822', '2026-04-07 08:24:41.984822', 18, 4),
(93, '2026-04-15', '09:30:00.000000', 'Mysql10 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.985327', '2026-04-07 08:24:41.985327', 26, 12),
(94, '2026-04-09', '18:15:00.000000', 'Mysql05 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'pending', '2026-04-07 08:24:41.985327', '2026-04-07 08:24:41.985327', 43, 7),
(95, '2026-04-21', '17:00:00.000000', 'Mysql09 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.985327', '2026-04-07 08:24:41.985327', 11, 11),
(96, '2026-04-15', '16:30:00.000000', 'Mysql07 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'cancelled', '2026-04-07 08:24:41.985327', '2026-04-07 08:24:41.985327', 78, 9),
(97, '2026-04-18', '17:15:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'confirmed', '2026-04-07 08:24:41.986336', '2026-04-07 08:24:41.986336', 2, 6),
(98, '2026-04-14', '12:15:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'rejected', '2026-04-07 08:24:41.986336', '2026-04-07 08:24:41.986336', 1, 10),
(99, '2026-03-23', '18:00:00.000000', 'Mysql04 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.986336', '2026-04-07 08:24:41.986336', 35, 6),
(100, '2026-03-19', '12:15:00.000000', 'Mysql08 Demo', '0900000000', '[direct-load-vietnam] Auto-created appointment.', 'completed', '2026-04-07 08:24:41.987374', '2026-04-07 08:24:41.987374', 96, 10);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add Blacklisted Token', 7, 'add_blacklistedtoken'),
(26, 'Can change Blacklisted Token', 7, 'change_blacklistedtoken'),
(27, 'Can delete Blacklisted Token', 7, 'delete_blacklistedtoken'),
(28, 'Can view Blacklisted Token', 7, 'view_blacklistedtoken'),
(29, 'Can add Outstanding Token', 8, 'add_outstandingtoken'),
(30, 'Can change Outstanding Token', 8, 'change_outstandingtoken'),
(31, 'Can delete Outstanding Token', 8, 'delete_outstandingtoken'),
(32, 'Can view Outstanding Token', 8, 'view_outstandingtoken'),
(33, 'Can add user profile', 9, 'add_userprofile'),
(34, 'Can change user profile', 9, 'change_userprofile'),
(35, 'Can delete user profile', 9, 'delete_userprofile'),
(36, 'Can view user profile', 9, 'view_userprofile'),
(37, 'Can add Bất động sản', 10, 'add_property'),
(38, 'Can change Bất động sản', 10, 'change_property'),
(39, 'Can delete Bất động sản', 10, 'delete_property'),
(40, 'Can view Bất động sản', 10, 'view_property'),
(41, 'Can add property image', 11, 'add_propertyimage'),
(42, 'Can change property image', 11, 'change_propertyimage'),
(43, 'Can delete property image', 11, 'delete_propertyimage'),
(44, 'Can view property image', 11, 'view_propertyimage'),
(45, 'Can add Yêu thích', 12, 'add_favorite'),
(46, 'Can change Yêu thích', 12, 'change_favorite'),
(47, 'Can delete Yêu thích', 12, 'delete_favorite'),
(48, 'Can view Yêu thích', 12, 'view_favorite'),
(49, 'Can add Lịch hẹn', 13, 'add_appointment'),
(50, 'Can change Lịch hẹn', 13, 'change_appointment'),
(51, 'Can delete Lịch hẹn', 13, 'delete_appointment'),
(52, 'Can view Lịch hẹn', 13, 'view_appointment'),
(53, 'Can add Tin tức', 14, 'add_news'),
(54, 'Can change Tin tức', 14, 'change_news'),
(55, 'Can delete Tin tức', 14, 'delete_news'),
(56, 'Can view Tin tức', 14, 'view_news');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$600000$4qJLTzjdyDq5XOItQ3E2XQ$lnHBl7mnOSm0mIKYssprWE344hx8osVAFJCQfB5pxP8=', '2026-04-07 00:59:09.193189', 1, 'admin', '', '', 'admin@example.com', 1, 1, '2026-04-07 00:30:20.732025'),
(2, 'pbkdf2_sha256$600000$JxcmEe476GMQADeNqacWXW$181CUnddJibigV1/YbtHEojk5COWAhrswPxtjfW0YtY=', NULL, 1, 'sinh', '', '', 'ngosinh12@gmail.com', 1, 1, '2026-04-07 00:40:37.939510'),
(3, 'pbkdf2_sha256$600000$QgoqSwPyAyr0GO63s7NwIQ$nyj5l1soRW8G0wxNgPSPbCupRhjvm8Gw+aaI0Tp7xn0=', NULL, 0, 'mysql_user_01', 'Mysql01', 'Demo', 'mysql_user_01@demo.local', 1, 1, '2026-04-07 08:24:39.469205'),
(4, 'pbkdf2_sha256$600000$89TsurKVzGnrCH8dxp7Gea$ZnPUR+06T4xh38geLsjOlPpANoX1uwCYeGjBr37AyoA=', NULL, 0, 'mysql_user_02', 'Mysql02', 'Demo', 'mysql_user_02@demo.local', 0, 1, '2026-04-07 08:24:39.686080'),
(5, 'pbkdf2_sha256$600000$Vqn8DyH7mWioCWy7RuQyTF$ttUSHhYfxeABXGxMOhytFgVAQ2ChtX753Zsv7xl8hy8=', NULL, 0, 'mysql_user_03', 'Mysql03', 'Demo', 'mysql_user_03@demo.local', 0, 1, '2026-04-07 08:24:39.886883'),
(6, 'pbkdf2_sha256$600000$tTjDjc9NCbuylxau1cwQ9e$ceg+7umTaGLcaCClQT2cYdj5p76VURsoUrsRPteXndo=', NULL, 0, 'mysql_user_04', 'Mysql04', 'Demo', 'mysql_user_04@demo.local', 0, 1, '2026-04-07 08:24:40.089491'),
(7, 'pbkdf2_sha256$600000$fcTE71r1QiN2ykuBrI32At$v3sLcUDSLnoji0phYa8kJF/7qBLIrl5u62lWAQa560M=', NULL, 0, 'mysql_user_05', 'Mysql05', 'Demo', 'mysql_user_05@demo.local', 0, 1, '2026-04-07 08:24:40.320860'),
(8, 'pbkdf2_sha256$600000$UZxwvdRbu2hn3To67LFR7b$DA5chhS+J2J4tg0Vz7aGWSDUavgRBkODI4iz6PHjaUM=', NULL, 0, 'mysql_user_06', 'Mysql06', 'Demo', 'mysql_user_06@demo.local', 0, 1, '2026-04-07 08:24:40.551518'),
(9, 'pbkdf2_sha256$600000$TkErTPDxPkDmQmLKF6gSdY$LVmb+qWSXgH6b7/5egfvs2PJF/uvYaZxZrOTdolXHpA=', NULL, 0, 'mysql_user_07', 'Mysql07', 'Demo', 'mysql_user_07@demo.local', 0, 1, '2026-04-07 08:24:40.751563'),
(10, 'pbkdf2_sha256$600000$HIl3vemjk6n4bzBagLjLDm$FkXVLg39e22sJzuscU9COB5Vju2PCSlktjRw8Z5pr7M=', NULL, 0, 'mysql_user_08', 'Mysql08', 'Demo', 'mysql_user_08@demo.local', 0, 1, '2026-04-07 08:24:40.963378'),
(11, 'pbkdf2_sha256$600000$yAcaMfGRI1cJVGFRJG0VDT$q0c7vmMMbVA2PgqHtztVbjscfZTNsj3h5/eR5o/1PO0=', NULL, 0, 'mysql_user_09', 'Mysql09', 'Demo', 'mysql_user_09@demo.local', 0, 1, '2026-04-07 08:24:41.182062'),
(12, 'pbkdf2_sha256$600000$7G6M0ek8f80N2GuPFVewbt$59YpTCRKEfLf5i8JU+syARzxTE928N8tXswYTpuNMgM=', NULL, 0, 'mysql_user_10', 'Mysql10', 'Demo', 'mysql_user_10@demo.local', 0, 1, '2026-04-07 08:24:41.353260');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `availability_schedules`
--

CREATE TABLE `availability_schedules` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `property_id` char(36) NOT NULL,
  `day_of_week` varchar(15) NOT NULL,
  `is_enabled` tinyint(1) DEFAULT 1
) ;

-- --------------------------------------------------------

--
-- Table structure for table `availability_slots`
--

CREATE TABLE `availability_slots` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `schedule_id` char(36) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(9, 'accounts', 'userprofile'),
(1, 'admin', 'logentry'),
(13, 'appointments', 'appointment'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(14, 'news', 'news'),
(12, 'properties', 'favorite'),
(10, 'properties', 'property'),
(11, 'properties', 'propertyimage'),
(6, 'sessions', 'session'),
(7, 'token_blacklist', 'blacklistedtoken'),
(8, 'token_blacklist', 'outstandingtoken');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2026-04-07 00:26:53.679339'),
(2, 'auth', '0001_initial', '2026-04-07 00:26:53.888144'),
(3, 'accounts', '0001_initial', '2026-04-07 00:26:53.910791'),
(4, 'admin', '0001_initial', '2026-04-07 00:26:53.955394'),
(5, 'admin', '0002_logentry_remove_auto_add', '2026-04-07 00:26:53.959793'),
(6, 'admin', '0003_logentry_add_action_flag_choices', '2026-04-07 00:26:53.964301'),
(7, 'properties', '0001_initial', '2026-04-07 00:26:54.055736'),
(8, 'properties', '0002_rename_province_property_city_and_more', '2026-04-07 00:26:54.148932'),
(9, 'appointments', '0001_initial', '2026-04-07 00:26:54.190004'),
(10, 'contenttypes', '0002_remove_content_type_name', '2026-04-07 00:26:54.210966'),
(11, 'auth', '0002_alter_permission_name_max_length', '2026-04-07 00:26:54.234206'),
(12, 'auth', '0003_alter_user_email_max_length', '2026-04-07 00:26:54.241627'),
(13, 'auth', '0004_alter_user_username_opts', '2026-04-07 00:26:54.247724'),
(14, 'auth', '0005_alter_user_last_login_null', '2026-04-07 00:26:54.264535'),
(15, 'auth', '0006_require_contenttypes_0002', '2026-04-07 00:26:54.265549'),
(16, 'auth', '0007_alter_validators_add_error_messages', '2026-04-07 00:26:54.270872'),
(17, 'auth', '0008_alter_user_username_max_length', '2026-04-07 00:26:54.279596'),
(18, 'auth', '0009_alter_user_last_name_max_length', '2026-04-07 00:26:54.288831'),
(19, 'auth', '0010_alter_group_name_max_length', '2026-04-07 00:26:54.297569'),
(20, 'auth', '0011_update_proxy_permissions', '2026-04-07 00:26:54.304877'),
(21, 'auth', '0012_alter_user_first_name_max_length', '2026-04-07 00:26:54.312552'),
(22, 'news', '0001_initial', '2026-04-07 00:26:54.336140'),
(23, 'sessions', '0001_initial', '2026-04-07 00:26:54.347691'),
(24, 'token_blacklist', '0001_initial', '2026-04-07 00:26:54.398650'),
(25, 'token_blacklist', '0002_outstandingtoken_jti_hex', '2026-04-07 00:26:54.410362'),
(26, 'token_blacklist', '0003_auto_20171017_2007', '2026-04-07 00:26:54.421431'),
(27, 'token_blacklist', '0004_auto_20171017_2013', '2026-04-07 00:26:54.468409'),
(28, 'token_blacklist', '0005_remove_outstandingtoken_jti', '2026-04-07 00:26:54.479991'),
(29, 'token_blacklist', '0006_auto_20171017_2113', '2026-04-07 00:26:54.490550'),
(30, 'token_blacklist', '0007_auto_20171017_2214', '2026-04-07 00:26:55.002412'),
(31, 'token_blacklist', '0008_migrate_to_bigautofield', '2026-04-07 00:26:55.104617'),
(32, 'token_blacklist', '0010_fix_migrate_to_bigautofield', '2026-04-07 00:26:55.116454'),
(33, 'token_blacklist', '0011_linearizes_history', '2026-04-07 00:26:55.118568'),
(34, 'token_blacklist', '0012_alter_outstandingtoken_user', '2026-04-07 00:26:55.182950'),
(35, 'token_blacklist', '0013_alter_blacklistedtoken_options_and_more', '2026-04-07 00:26:55.193039');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('3nj7g0b2x2y02lfi6k9p1scaez574glp', '.eJxVjDsOwjAQBe_iGlnr-BdT0nMGa73e4ACypTipEHeHSCmgfTPzXiLitpa4dV7inMVZKHH63RLSg-sO8h3rrUlqdV3mJHdFHrTLa8v8vBzu30HBXr716CgY0EDTZF1Q7NgjZkKFbIg9aDIQjHVkvIaROHhwoIdkLA1BZxDvD-NcN2s:1w9umb:8lm-QrtBtI2t69w4SLZUI_74NH1_X5XXLlvRoH5n3-w', '2026-04-21 00:59:09.203834');

-- --------------------------------------------------------

--
-- Table structure for table `market_stats`
--

CREATE TABLE `market_stats` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `city` varchar(150) NOT NULL,
  `year` smallint(6) NOT NULL,
  `month` tinyint(4) NOT NULL,
  `avg_price_per_sqm` decimal(10,2) DEFAULT NULL,
  `total_listings` int(11) DEFAULT 0,
  `total_views` int(11) DEFAULT 0,
  `active_buyers` int(11) DEFAULT 0,
  `change_pct` decimal(6,3) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `news_articles`
--

CREATE TABLE `news_articles` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `title` varchar(500) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `cover_image_url` text DEFAULT NULL,
  `read_time_minutes` tinyint(4) DEFAULT 5,
  `published_date` date DEFAULT NULL,
  `is_featured` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news_news`
--

CREATE TABLE `news_news` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `views_count` int(10) UNSIGNED NOT NULL CHECK (`views_count` >= 0),
  `is_published` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `price_predictions`
--

CREATE TABLE `price_predictions` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `property_id` char(36) DEFAULT NULL,
  `predicted_price` bigint(20) NOT NULL,
  `confidence_score` decimal(5,4) DEFAULT NULL,
  `r_squared` decimal(6,5) DEFAULT NULL,
  `input_features` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`input_features`)),
  `predicted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `price_training_data`
--

CREATE TABLE `price_training_data` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `city` varchar(150) NOT NULL,
  `district` varchar(150) DEFAULT NULL,
  `property_type` varchar(50) DEFAULT NULL,
  `area_sqm` int(11) NOT NULL,
  `bedrooms` tinyint(4) DEFAULT 0,
  `bathrooms` tinyint(4) DEFAULT 0,
  `year_built` smallint(6) DEFAULT NULL,
  `legal_status` varchar(100) DEFAULT NULL,
  `furniture` varchar(100) DEFAULT NULL,
  `facing` varchar(50) DEFAULT NULL,
  `has_pool` tinyint(1) DEFAULT 0,
  `has_garage` tinyint(1) DEFAULT 0,
  `has_garden` tinyint(1) DEFAULT 0,
  `actual_price` bigint(20) NOT NULL,
  `price_per_sqm` int(11) GENERATED ALWAYS AS (`actual_price` / `area_sqm`) STORED,
  `transaction_date` date DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE `properties` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `owner_id` char(36) NOT NULL,
  `agent_id` char(36) DEFAULT NULL,
  `title` varchar(300) NOT NULL,
  `price` bigint(20) DEFAULT NULL,
  `price_label` varchar(100) DEFAULT NULL,
  `street` varchar(300) DEFAULT NULL,
  `district` varchar(150) DEFAULT NULL,
  `city` varchar(150) NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `bedrooms` tinyint(4) DEFAULT 0,
  `bathrooms` tinyint(4) DEFAULT 0,
  `area_sqm` int(11) DEFAULT NULL,
  `listing_type` varchar(20) DEFAULT 'For Sale',
  `property_type` varchar(50) DEFAULT NULL,
  `year_built` smallint(6) DEFAULT NULL,
  `floor_info` varchar(100) DEFAULT NULL,
  `facing` varchar(50) DEFAULT NULL,
  `legal_status` varchar(100) DEFAULT NULL,
  `furniture` varchar(100) DEFAULT NULL,
  `status` varchar(30) DEFAULT 'active',
  `cover_image_url` text DEFAULT NULL,
  `overview` text DEFAULT NULL,
  `views_count` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp()
) ;

-- --------------------------------------------------------

--
-- Table structure for table `properties_favorite`
--

CREATE TABLE `properties_favorite` (
  `id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `property_id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties_favorite`
--

INSERT INTO `properties_favorite` (`id`, `created_at`, `property_id`, `user_id`) VALUES
(1, '2026-04-07 08:24:41.749435', 85, 12),
(2, '2026-04-07 08:24:41.751440', 77, 8),
(3, '2026-04-07 08:24:41.753999', 4, 6),
(4, '2026-04-07 08:24:41.755008', 2, 6),
(5, '2026-04-07 08:24:41.755008', 74, 6),
(6, '2026-04-07 08:24:41.756298', 93, 4),
(7, '2026-04-07 08:24:41.757382', 79, 5),
(8, '2026-04-07 08:24:41.758390', 54, 10),
(9, '2026-04-07 08:24:41.759894', 9, 3),
(10, '2026-04-07 08:24:41.759894', 85, 6),
(11, '2026-04-07 08:24:41.761823', 39, 8),
(12, '2026-04-07 08:24:41.762951', 7, 3),
(13, '2026-04-07 08:24:41.763951', 47, 12),
(14, '2026-04-07 08:24:41.763951', 35, 6),
(15, '2026-04-07 08:24:41.765457', 10, 11),
(16, '2026-04-07 08:24:41.766464', 76, 7),
(17, '2026-04-07 08:24:41.767880', 18, 4),
(18, '2026-04-07 08:24:41.768888', 69, 4),
(19, '2026-04-07 08:24:41.769895', 76, 4),
(20, '2026-04-07 08:24:41.770893', 93, 3),
(21, '2026-04-07 08:24:41.771773', 94, 6),
(22, '2026-04-07 08:24:41.772778', 95, 7),
(23, '2026-04-07 08:24:41.773776', 67, 3),
(24, '2026-04-07 08:24:41.774810', 32, 6),
(25, '2026-04-07 08:24:41.775803', 47, 6),
(26, '2026-04-07 08:24:41.776809', 76, 11),
(27, '2026-04-07 08:24:41.776809', 54, 4),
(28, '2026-04-07 08:24:41.778318', 20, 9),
(29, '2026-04-07 08:24:41.779337', 29, 7),
(30, '2026-04-07 08:24:41.780341', 38, 8),
(31, '2026-04-07 08:24:41.780341', 73, 3),
(32, '2026-04-07 08:24:41.782359', 3, 9),
(33, '2026-04-07 08:24:41.782359', 95, 5),
(34, '2026-04-07 08:24:41.783729', 40, 8),
(35, '2026-04-07 08:24:41.783729', 59, 6),
(36, '2026-04-07 08:24:41.786361', 42, 11),
(37, '2026-04-07 08:24:41.786361', 37, 4),
(38, '2026-04-07 08:24:41.787358', 95, 12),
(39, '2026-04-07 08:24:41.788860', 60, 9),
(40, '2026-04-07 08:24:41.789863', 32, 7),
(41, '2026-04-07 08:24:41.791864', 86, 12),
(42, '2026-04-07 08:24:41.792369', 94, 4),
(43, '2026-04-07 08:24:41.793379', 79, 6),
(44, '2026-04-07 08:24:41.793379', 47, 11),
(45, '2026-04-07 08:24:41.794875', 28, 8),
(46, '2026-04-07 08:24:41.795388', 23, 3),
(47, '2026-04-07 08:24:41.795388', 90, 7),
(48, '2026-04-07 08:24:41.796890', 46, 7),
(49, '2026-04-07 08:24:41.797931', 68, 5),
(50, '2026-04-07 08:24:41.798964', 8, 4),
(51, '2026-04-07 08:24:41.800025', 59, 3),
(52, '2026-04-07 08:24:41.800025', 12, 9),
(53, '2026-04-07 08:24:41.801532', 57, 9),
(54, '2026-04-07 08:24:41.801532', 4, 11),
(55, '2026-04-07 08:24:41.804166', 66, 4),
(56, '2026-04-07 08:24:41.805354', 36, 12),
(57, '2026-04-07 08:24:41.806775', 99, 5),
(58, '2026-04-07 08:24:41.807775', 43, 7),
(59, '2026-04-07 08:24:41.808775', 42, 8),
(60, '2026-04-07 08:24:41.808775', 58, 5),
(61, '2026-04-07 08:24:41.810280', 24, 6),
(62, '2026-04-07 08:24:41.811793', 74, 3),
(63, '2026-04-07 08:24:41.812799', 61, 7),
(64, '2026-04-07 08:24:41.813929', 6, 12),
(65, '2026-04-07 08:24:41.813929', 54, 9),
(66, '2026-04-07 08:24:41.814936', 97, 6),
(67, '2026-04-07 08:24:41.816440', 64, 12),
(68, '2026-04-07 08:24:41.817654', 30, 11),
(69, '2026-04-07 08:24:41.817654', 1, 9),
(70, '2026-04-07 08:24:41.819158', 39, 11),
(71, '2026-04-07 08:24:41.819158', 58, 3),
(72, '2026-04-07 08:24:41.821691', 8, 3),
(73, '2026-04-07 08:24:41.822194', 94, 12),
(74, '2026-04-07 08:24:41.823199', 91, 12),
(75, '2026-04-07 08:24:41.824205', 92, 12),
(76, '2026-04-07 08:24:41.825228', 84, 5),
(77, '2026-04-07 08:24:41.826388', 73, 10),
(78, '2026-04-07 08:24:41.826388', 65, 5),
(79, '2026-04-07 08:24:41.828509', 11, 3),
(80, '2026-04-07 08:24:41.829596', 87, 12),
(81, '2026-04-07 08:24:41.829596', 22, 3),
(82, '2026-04-07 08:24:41.830630', 83, 10),
(83, '2026-04-07 08:24:41.832132', 28, 5),
(84, '2026-04-07 08:24:41.832132', 92, 3),
(85, '2026-04-07 08:24:41.833415', 79, 11),
(86, '2026-04-07 08:24:41.833415', 56, 4),
(87, '2026-04-07 08:24:41.835171', 66, 11),
(88, '2026-04-07 08:24:41.836384', 56, 8),
(89, '2026-04-07 08:24:41.836384', 64, 10),
(90, '2026-04-07 08:24:41.838946', 89, 7),
(91, '2026-04-07 08:24:41.839954', 84, 3),
(92, '2026-04-07 08:24:41.839954', 21, 10),
(93, '2026-04-07 08:24:41.841458', 91, 6),
(94, '2026-04-07 08:24:41.842593', 32, 10),
(95, '2026-04-07 08:24:41.843594', 61, 11),
(96, '2026-04-07 08:24:41.843594', 30, 10),
(97, '2026-04-07 08:24:41.845350', 33, 8),
(98, '2026-04-07 08:24:41.846415', 71, 9),
(99, '2026-04-07 08:24:41.847727', 95, 3),
(100, '2026-04-07 08:24:41.847727', 8, 12),
(101, '2026-04-07 08:24:41.849738', 28, 10),
(102, '2026-04-07 08:24:41.850736', 81, 5),
(103, '2026-04-07 08:24:41.851757', 51, 11),
(104, '2026-04-07 08:24:41.852294', 80, 4),
(105, '2026-04-07 08:24:41.853301', 79, 7),
(106, '2026-04-07 08:24:41.854310', 3, 3),
(107, '2026-04-07 08:24:41.855308', 39, 5),
(108, '2026-04-07 08:24:41.855308', 16, 7),
(109, '2026-04-07 08:24:41.856309', 36, 10),
(110, '2026-04-07 08:24:41.857429', 72, 6),
(111, '2026-04-07 08:24:41.858932', 38, 3),
(112, '2026-04-07 08:24:41.859939', 8, 7),
(113, '2026-04-07 08:24:41.859939', 5, 5),
(114, '2026-04-07 08:24:41.861466', 31, 7),
(115, '2026-04-07 08:24:41.861978', 99, 11),
(116, '2026-04-07 08:24:41.863004', 58, 9),
(117, '2026-04-07 08:24:41.864151', 91, 7),
(118, '2026-04-07 08:24:41.865466', 6, 10),
(119, '2026-04-07 08:24:41.866465', 86, 11),
(120, '2026-04-07 08:24:41.869140', 10, 8),
(121, '2026-04-07 08:24:41.870148', 63, 5),
(122, '2026-04-07 08:24:41.871650', 40, 9),
(123, '2026-04-07 08:24:41.871650', 50, 11),
(124, '2026-04-07 08:24:41.872674', 88, 8),
(125, '2026-04-07 08:24:41.873678', 63, 10),
(126, '2026-04-07 08:24:41.875185', 25, 3),
(127, '2026-04-07 08:24:41.875185', 77, 6),
(128, '2026-04-07 08:24:41.876185', 82, 8),
(129, '2026-04-07 08:24:41.877187', 34, 11),
(130, '2026-04-07 08:24:41.879701', 80, 10),
(131, '2026-04-07 08:24:41.879701', 26, 3),
(132, '2026-04-07 08:24:41.881628', 61, 10),
(133, '2026-04-07 08:24:41.882136', 82, 4),
(134, '2026-04-07 08:24:41.883147', 49, 3),
(135, '2026-04-07 08:24:41.884155', 1, 11),
(136, '2026-04-07 08:24:41.885155', 96, 4),
(137, '2026-04-07 08:24:41.886662', 88, 10),
(138, '2026-04-07 08:24:41.888168', 76, 8),
(139, '2026-04-07 08:24:41.889204', 21, 3),
(140, '2026-04-07 08:24:41.890214', 86, 10),
(141, '2026-04-07 08:24:41.891467', 100, 9),
(142, '2026-04-07 08:24:41.892480', 11, 8),
(143, '2026-04-07 08:24:41.893850', 44, 9),
(144, '2026-04-07 08:24:41.894880', 41, 9),
(145, '2026-04-07 08:24:41.894880', 57, 8),
(146, '2026-04-07 08:24:41.896101', 83, 3),
(147, '2026-04-07 08:24:41.897121', 21, 7),
(148, '2026-04-07 08:24:41.897121', 63, 3),
(149, '2026-04-07 08:24:41.898502', 12, 10),
(150, '2026-04-07 08:24:41.900793', 46, 12),
(151, '2026-04-07 08:24:41.900793', 21, 8),
(152, '2026-04-07 08:24:41.901793', 70, 8),
(153, '2026-04-07 08:24:41.903209', 18, 5),
(154, '2026-04-07 08:24:41.903209', 16, 5),
(155, '2026-04-07 08:24:41.904356', 87, 4),
(156, '2026-04-07 08:24:41.905861', 23, 4),
(157, '2026-04-07 08:24:41.905861', 95, 9),
(158, '2026-04-07 08:24:41.906866', 44, 12),
(159, '2026-04-07 08:24:41.908892', 52, 7),
(160, '2026-04-07 08:24:41.910400', 94, 10),
(161, '2026-04-07 08:24:41.911904', 98, 10),
(162, '2026-04-07 08:24:41.913027', 71, 8),
(163, '2026-04-07 08:24:41.914029', 88, 6),
(164, '2026-04-07 08:24:41.915075', 3, 7),
(165, '2026-04-07 08:24:41.915075', 80, 7),
(166, '2026-04-07 08:24:41.916577', 42, 6),
(167, '2026-04-07 08:24:41.918126', 40, 6),
(168, '2026-04-07 08:24:41.918126', 27, 9),
(169, '2026-04-07 08:24:41.919131', 31, 8),
(170, '2026-04-07 08:24:41.920644', 51, 12),
(171, '2026-04-07 08:24:41.921654', 49, 6),
(172, '2026-04-07 08:24:41.922670', 18, 10),
(173, '2026-04-07 08:24:41.922670', 92, 9),
(174, '2026-04-07 08:24:41.924803', 33, 4),
(175, '2026-04-07 08:24:41.924803', 85, 4),
(176, '2026-04-07 08:24:41.926295', 96, 6),
(177, '2026-04-07 08:24:41.927530', 79, 3),
(178, '2026-04-07 08:24:41.928538', 7, 7),
(179, '2026-04-07 08:24:41.929549', 55, 4),
(180, '2026-04-07 08:24:41.931561', 30, 12),
(181, '2026-04-07 08:24:41.932078', 90, 12),
(182, '2026-04-07 08:24:41.933132', 7, 11),
(183, '2026-04-07 08:24:41.934138', 68, 7),
(184, '2026-04-07 08:24:41.935136', 1, 6),
(185, '2026-04-07 08:24:41.935644', 24, 4),
(186, '2026-04-07 08:24:41.936650', 32, 12),
(187, '2026-04-07 08:24:41.936650', 19, 5),
(188, '2026-04-07 08:24:41.938153', 75, 7),
(189, '2026-04-07 08:24:41.939165', 94, 9),
(190, '2026-04-07 08:24:41.940165', 5, 11),
(191, '2026-04-07 08:24:41.940165', 67, 7),
(192, '2026-04-07 08:24:41.941668', 55, 3),
(193, '2026-04-07 08:24:41.943138', 31, 5),
(194, '2026-04-07 08:24:41.944139', 22, 9),
(195, '2026-04-07 08:24:41.945641', 74, 10),
(196, '2026-04-07 08:24:41.946648', 62, 4),
(197, '2026-04-07 08:24:41.947653', 85, 9),
(198, '2026-04-07 08:24:41.948645', 32, 9),
(199, '2026-04-07 08:24:41.949752', 9, 11),
(200, '2026-04-07 08:24:41.949752', 43, 4);

-- --------------------------------------------------------

--
-- Table structure for table `properties_property`
--

CREATE TABLE `properties_property` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `property_type` varchar(20) NOT NULL,
  `listing_type` varchar(10) NOT NULL,
  `status` varchar(20) NOT NULL,
  `price` decimal(15,0) NOT NULL,
  `price_unit` varchar(20) NOT NULL,
  `area` decimal(10,2) NOT NULL,
  `bedrooms` smallint(5) UNSIGNED DEFAULT NULL,
  `bathrooms` smallint(5) UNSIGNED DEFAULT NULL,
  `floors` smallint(5) UNSIGNED DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `district` varchar(100) DEFAULT NULL,
  `ward` varchar(100) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `has_parking` tinyint(1) NOT NULL,
  `has_pool` tinyint(1) NOT NULL,
  `has_garden` tinyint(1) NOT NULL,
  `is_furnished` tinyint(1) NOT NULL,
  `views_count` int(10) UNSIGNED NOT NULL CHECK (`views_count` >= 0),
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `owner_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties_property`
--

INSERT INTO `properties_property` (`id`, `title`, `description`, `property_type`, `listing_type`, `status`, `price`, `price_unit`, `area`, `bedrooms`, `bathrooms`, `floors`, `city`, `district`, `ward`, `address`, `latitude`, `longitude`, `has_parking`, `has_pool`, `has_garden`, `is_furnished`, `views_count`, `is_featured`, `is_active`, `created_at`, `updated_at`, `owner_id`) VALUES
(1, 'Đất xây nhà, đầu tư cho công nhân giá quá rẻ, 5x30, giá 780TR, shr, đường đá 4m ngay Đức Hòa Thượng', 'Nền đất đẹp xây nhà, đầu tư cho công nhân giá quá rẻ thuộc xã Đức Hòa Thượng, Huyện Đức Hòa Diện tích: 5x30 (150m2), đất thổ cư, đất cao bằng đường không trũng k mồ mả Đường đá xanh 4m trước đất, khu dân cư hiện hữu Phù hợp đầu tư mua giữ tiền và xây nhà giá rất tốt cho anh chị em công nhân Giá : 780 triệu, có bớt lộc cho khách thiện chí Anh chị quan tâm xem đất gọi em ạ [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 780000000, 'VND', 150.00, NULL, NULL, NULL, 'Long An', 'Đức Hòa', 'Đức Hòa Thượng', 'Tỉnh lộ 825', NULL, NULL, 0, 0, 0, 0, 3871, 0, 1, '2026-04-07 08:24:41.571852', '2026-04-07 08:24:41.571852', 4),
(2, 'Chính chủ cần bán gấp ô tô đỗ cửa - dân xây chất - 38m2 - 4 tầng - giá chỉ nhỉnh 6 tỷ', 'Chính chủ cần bán gấp. Ô tô đỗ cửa - dân xây chất - 38m2 - 4 tầng - giá chỉ nhỉnh 6 tỷ. Địa chỉ: Nam Dư - Lĩnh Nam. Vị trí đẹp: Gần trường, chợ, bãi gửi ô tô! Liên hệ: E. Thương để xem nhà! Ngoài ra Em Thương còn rất nhiều căn chính chủ gửi bán.\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 6500000000, 'VND', 38.00, NULL, NULL, 4, 'Hà Nội', 'Hoàng Mai', 'Lĩnh Nam', 'Nam Dư', NULL, NULL, 1, 0, 0, 0, 6262, 0, 1, '2026-04-07 08:24:41.578374', '2026-04-07 08:24:41.578374', 5),
(3, 'Nhà dân xây - dòng tiền 20tr/tháng. Ngõ 34 Âu Cơ. Giá hợp lý', 'Dân xây - căn hộ dịch vụ - giá đầu - dòng tiền 20 triệu/tháng - hiếm khu Tây Hồ. Vị trí gần ô tô tránh đỗ vòng quanh. Gần cầu Tứ Liên, Hồ Tây khu vực tiềm năng tăng giá không phanh. Thiết kế: T1: Sảnh rộng thông phòng để xe. T2,3,4, 5: Mỗi tầng 1 phòng vệ sinh khép kín. Chủ nhà tự vận hành cho thuê nhẹ nhàng 5 triệu/ phòng. Tổng 4 phòng doanh thu 20 triệu/ tháng. Sổ đỏ chính chủ.\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 10600000000, 'VND', 41.00, 4, 4, 5, 'Hà Nội', 'Tây Hồ', 'Yên Phụ', 'Âu Cơ', NULL, NULL, 0, 0, 0, 0, 11232, 0, 1, '2026-04-07 08:24:41.580470', '2026-04-07 08:24:41.580470', 6),
(4, 'Bán căn hộ signature midtown- phú mỹ hưng', 'Chủ nhà thiện chí bán 1 căn giá tốt nhất thị trường The Signature Midtown Diện tich 81m2. 2pn, 2wc, nội thất đầy đủ Ban công Đông Nam - View Thác nước, ô xe hầm - Sắn HDT lâu dài giá cao - Chỉ 9.45 tỷ Em Kim Kim [phone_number][phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 9450000000, 'VND', 81.00, NULL, NULL, NULL, 'Hồ Chí Minh', '7', 'Tân Phú', 'The Signature', NULL, NULL, 0, 0, 0, 0, 4167, 0, 1, '2026-04-07 08:24:41.581464', '2026-04-07 08:24:41.581464', 7),
(5, 'Chính chủ bán căn hộ dòng tiền 50m2 dòng tiền 45tr/tháng 9 phòng khép kín', 'Chính chủ bán căn hộ dòng tiền tại ngõ 79 Cầu Giấy. Diện tích 50m2, thiết kế 5 tầng, tồn 9 phòng khép kín. Dòng tiền tự vận hành 45tr/1 tháng. Ngõ nông, đường ba gác đánh võng, thông tứ phía. Vị trí có nhiều sinh viên, tỉ lệ luôn luôn kín phòng. Giá bán 11.5 tỷ có thương lượng. Chính chủ rao bán [phone_number]không qua môi giới).\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 11500000000, 'VND', 50.00, NULL, NULL, 5, 'Hà Nội', 'Cầu Giấy', 'Yên Hòa', 'Cầu Giấy', NULL, NULL, 0, 0, 0, 1, 11264, 0, 1, '2026-04-07 08:24:41.582823', '2026-04-07 08:24:41.582823', 8),
(6, 'Cần bán nhanh căn nhà 3 tầng, Khu TĐC Hòn Rớ 2, căn góc 2 mặt tiền - CHỈ 7.1 TỶ!', 'Cần bán nhanh căn nhà 3 tầng, Khu TĐC Hòn Rớ 2, căn góc 2 mặt tiền - CHỈ 7.1 TỶ! - Diện tích đất: 68,7m2 ngang 4.5m. Lô góc 2 mặt tiền, đường trước nhà rộng 13m, bên hông 7m thông thẳng Nguyễn Tất Thành, gần dự án Sun Group, phía gần sông - Nhà có 2 phòng ngủ, 3WC - Pháp lý: Sổ hồng - Giá bán: 7.1 tỷ Lh xem nhà : [phone_number] - Minh Hiếu ( phone/zalo )\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7100000000, 'VND', 68.70, 3, 2, NULL, 'Khánh Hòa', 'Nha Trang', 'Vĩnh Trường', 'Hòn Rớ 2', NULL, NULL, 1, 0, 0, 0, 6728, 0, 1, '2026-04-07 08:24:41.584223', '2026-04-07 08:24:41.584223', 9),
(7, 'Nhà 5 tầng trung tâm Quận 3, hẻm xe hơi 5m', 'Chính chủ gửi: Nhà 1/ Nguyễn Đình Chiểu, P4, Q3, hẻm xe hơi. DT: 3 x 10m. 1 trệt + 4 lầu, nở hậu, 3 WC, 3 PN, rất đẹp, sạch sẽ, chắc chắn, thoáng mát, số hồng chính chủ. 8 tỷ 900 triệu. Trần Tú:\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 46354166, 'VND', 30.00, 3, 3, 5, 'Hồ Chí Minh', '3', '4', 'Nguyễn Đình Chiểu', NULL, NULL, 1, 0, 0, 0, 2246, 1, 1, '2026-04-07 08:24:41.586235', '2026-04-07 08:24:41.586235', 10),
(8, 'BÁN NHÀ NƠ TRANG LONG 4.5x16m Nở hậu - Giá tốt chỉ hơn 9 Tỷ còn Thương lượng', 'BÁN NHÀ NƠ TRANG LONG 4.5x16m Nở hậu - Giá tốt chỉ hơn 9 Tỷ còn Thương lượng - Diện tích: 4.5x16m Nở hậu CN 63m², phong thuỷ tốt phát triển sự nghiệp, tiền tài may mắn. - Kết cấu: 3PN, 3WC, nội thất đầy đủ tiện nghi. - Khu vực dân trí cao, đường phố sạch sẽ, chính chủ ở lâu năm chưa qua mua bán. Vị trí: nằm ở Nơ Trang Long ngay cầu Bình Lợi, kết nối ra Bình Lợi, ngã tư Nguyễn Xí, trục giao thông Phạm Văn Đồng, cách Gigamall 5 phút. Xung quanh có chợ, nhiều trường học, bệnh viện Đa Khoa Gia Định... Giá: 9.2 Tỷ thương lượng - Zalo em Huyền hỗ trợ tìm nhà với chi phí hợp lí nhất!\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 34456928, 'VND', 63.00, 3, 3, 3, 'Hồ Chí Minh', 'Bình Thạnh', '13', 'Nơ Trang Long', NULL, NULL, 1, 0, 0, 0, 7051, 0, 1, '2026-04-07 08:24:41.588239', '2026-04-07 08:24:41.588239', 11),
(9, 'Quỹ căn vip shophouse, biệt thự,căn hộ ven sông hàn giá gốc sun group chỉ 16 tỷ/căn chiết khấu 21%', 'Giỏ hàng đẹp nhất các căn shophouse 3 tầng - 5 tầng mặt tiền Trần Hưng Đạo - view sông Hàn - cạnh 8 tòa chung cư cao cấp nhất Đà Nẵng - giá chỉ 16 tỷ xx/căn. Mua trực tiếp từ chủ đầu tư Sun Group. * Đặc biệt các căn này thuộc giỏ hàng đợt 1. Căn shophouse nằm ngay trung tâm 5 tòa căn hộ với hơn 8000 cư dân cao cấp, ngay cạnh bến du thuyền Sun Group, tiềm năng kinh doanh vô hạn. Dự án Sun Symphony Residence của tập đoàn Sun Group. Đây là Tổ hợp Semi Compound Symphony Residence là tổ hợp Đầu Tiên và Duy Nhất sở hữu mặt tiền ven sông Hàn. Dự án có Quy mô lớn nhất 8Ha. Sở hữu vị trí sát mặt sông Hàn với chiều dài 1km. Được xây dựng đồng bộ, an ninh 24/7. - Quy mô: 8ha, bao gồm 2 phân khu: The Symphony - Phân khu cao tầng: 1,6 Ha. - Gồm có 03 tòa với 1.418 căn hộ (bao gồm shophouse khối đế tầng 1 và tầng 2). The Sonata - Phân khu thấp tầng: 3 Ha. - Gồm có 180 căn Townhouse + 20 căn Villa mặt sông Hàn phiên bản giới hạn. Hình thức sở hữu: 100% sở hữu lâu dài đất ở đô thị. * Chính sách bán hàng chiết khấu cao nhất lên đến 16% - Hỗ trợ vay ngân hàng 18 tháng lãi gốc 0%. Chính sách căn hộ, duplex vip view sông chiết khấu 21% hỗ trợ vay lên đến 36 tháng * Tiềm năng khai thác cho thuê dự kiến 80 - 100 triệu/tháng. Với mức giá chỉ từ 16 tỷ/căn sở hữu căn shophouse quá đẳng cấp. * Quý anh chị quan tâm vui lòng liên hệ trực tiếp em [phone_number] - Nguyễn Hiếu - Giám Đốc Kinh Doanh Sun Symphony Đà Nẵng để nhận bảng giá, bảng dự toán dòng tiền cho thuê, phân tích đầu tư chuyên sâu tổng quan thị trường Đà Nẵng. Với kinh nghiệm 9 năm phân phối thị trường BDS cao cấp cho tập đoàn Sun Group em tin chắc sẽ mang lại những thông tin giá trị đa chiều cho quý nhà đầu tư.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 16000000000, 'VND', 108.00, NULL, NULL, NULL, 'Đà Nẵng', 'Sơn Trà', 'Nại Hiên Đông', 'Sun Symphony Residence', NULL, NULL, 0, 0, 0, 1, 2838, 0, 1, '2026-04-07 08:24:41.588239', '2026-04-07 08:24:41.588239', 12),
(10, 'Bán BT Lideco 4PN, 3WC, 80m2, giá siêu hời 11 tỷ tại Quốc lộ 32, Trạm Trôi', 'Nằm trong khu đô thị mới Trục QL32, Tây Thăng Long, Hoàng Quốc Việt kéo dài, liền kề có 4PN, 3WC, 4 tầng, với. Cửa chính hướng Đông Bắc, mặt tiền 5m, ngõ trước rộng 10m, cực kỳ thoáng đãng và thuận lợi cho việc di chuyển. Thiết kế layout đẹp, không gian sống thoải mái, rất phù hợp cho gia đình nhiều thế hệ gần gũi thiên nhiên, đầy đủ tiện nghi Giá chỉ 11 tỷ VND, một deal không thể bỏ qua cho một căn LK chất lượng như này. Phong thủy cực tốt, mang lại sự thịnh vượng cho gia chủ. Mặt tiền rộng, có thể mở cửa hàng hoặc văn phòng nếu cần. Địa điểm xung quanh: - Trường Quốc tế, Bệnh viện quốc tế, công viên chuyên đề. - Gần Vinhomes Đan Phượng - Bệnh viện đa khoa Hoài Đức - Siêu thị Winmart Hoài Đức, T-Mart - Học viện Khoa học Quân sự, Nhật ngữ Isshin Liên hệ [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 11000000000, 'VND', 80.00, 4, 3, 4, 'Hà Nội', 'Hoài Đức', 'Trạm Trôi', 'Khu đô thị mới Lideco - Bắc Quốc lộ 32', NULL, NULL, 0, 0, 0, 0, 9991, 0, 1, '2026-04-07 08:24:41.590224', '2026-04-07 08:24:41.590224', 3),
(11, 'Bán căn góc 126,1m chung cư 349 Vũ Tông Phan, sẵn nội thất, có slot ô tô, có sổ đỏ, 95tr/m có TL', 'Bán căn góc 126,1m chung cư 349 Vũ Tông Phan, sẵn nội thất, có slot ô tô, có sổ đỏ, 95tr/m có TL - Vị trí: chung cư Riverside Graden ( 349 Vũ Tông Phan ) - Diện tích: 126,1m - Căn góc hoa hậu, thiết kế 3 ngủ + 2 vệ sinh - Sẵn sổ đỏ - Có slot ô tô - Đầy đủ nội thất - Giá 90 triệu/m có thương lượng sđt/zalo:\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 39961267, 'VND', 126.10, 3, 2, NULL, 'Hà Nội', 'Thanh Xuân', 'Khương Đình', 'Vũ Tông Phan', NULL, NULL, 1, 0, 0, 0, 1216, 0, 1, '2026-04-07 08:24:41.594243', '2026-04-07 08:24:41.594243', 4),
(12, 'Nhà 13 x 21 căn góc đường D5 và N4, khu TM - DV The Seasons, P. Lái Thiêu, TP. Thuận An, Bình Dương', '- Nhà 13 x 21 có thang máy, căn góc đường D5 và N4, khu TM - DV The Seasons, P. Lái Thiêu, TP. Thuận An, Bình Dương(. Cũ)nay là TP. HCM. - Kề bên siêu thị Lotte và bệnh viện quốc tế becamex. Nhà ga Metro số 2. Đường Quốc Lộ 13 đang mở rộng 60 mét. Nên rất thuận tiện cho việc đi lại và sinh hoạt. - Diện tích sàn gần 1000m2. - Thiết kế: 1 trệt 3 lầu, trên sân thượng. (để sàn trống). - Tiện làm văn phòng cty, trường học, spa, gym, Bi A... - Nhà minh quan tâm LH em zalo [phone_number] coi nhà gặp chủ mua sở hữu nhé.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 32000000000, 'VND', 273.00, 3, 4, NULL, 'Bình Dương', 'Thuận An', 'Lái Thiêu', 'The Seasons Lái Thiêu', NULL, NULL, 0, 0, 0, 1, 392, 0, 1, '2026-04-07 08:24:41.595748', '2026-04-07 08:24:41.595748', 5),
(13, 'Dragon Hill 1 - 92m (3PN - 2WC) - Sổ Hồng. Đầy đủ nội thất. Hường Gió nguyên ngày', 'Bán căn hộ Dragon Hill 1 (Dragon Hill Residence and Suites 1) - 15A1 Nguyễn Hữu Thọ, Phước Kiển, Nhà Bè, HCM. - Diện tích: 92m² (3PN - 2WC) - Nội thất: Đầy đủ. Nhà đẹp. - View: Hồ bơi. Hướng gió nguyên ngày. - Miễn phí: Xe máy, hồ bơi. - Pháp lý: Sổ Hồng. - Giá: 4,8 tỷ. * Liên hệ xem nhà: - Tiện ích khu căn hộ: Hồ bơi, siêu thị, nhà trẻ, gym, công viên, khu vui chơi trẻ em, cafe. - Tiện ích ngoại khu: Phú Mỹ Hưng, Vivo City, trường học (RMIT, Tôn Đức Thắng, Nguyễn Tất Thành, cấp 1, 2 đầy đủ... ), chợ Phước Kiển, trạm xăng, bệnh viện...\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 4800000000, 'VND', 92.00, 3, 2, NULL, 'Hồ Chí Minh', 'Nhà Bè', 'Phước Kiển', 'Nguyễn Hữu Thọ', NULL, NULL, 0, 0, 1, 0, 8313, 0, 1, '2026-04-07 08:24:41.597754', '2026-04-07 08:24:41.597754', 6),
(14, 'Bán căn hộ chung cư Bàu Cát 2, Tân Bình - sổ hồng chính chủ - giá 2,73 tỷ', 'Bán căn hộ chung cư Bàu Cát 2, Tân Bình - sổ hồng chính chủ - giá 2,73 tỷ. Vị trí: Chung cư Bàu Cát 2, phường 10, Tân Bình. Diện tích: 54,6 m2 (tầng 3). Kết cấu: 2PN, 2WC. Tặng kèm nội thất: 2 máy lạnh, tủ lạnh, máy giặt,... Pháp lý: Sổ hồng đầy đủ. Khu vực dân trí cao, yên tĩnh, cộng đồng cư dân thân thiện. Tiện ích: Nội khu có công viên cây xanh, sân chơi trẻ em, bảo vệ 24/7. Gần chợ Bàu Cát, siêu thị Big C, Aeon Mall Tân Phú, Vincom. Gần nhiều trường học, bệnh viện, ngân hàng, UBND. Di chuyển nhanh đến sân bay Tân Sơn Nhất chỉ 10 phút. Giá bán: 2,73 tỷ (bớt lộc).\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2730000000, 'VND', 54.60, 2, 2, NULL, 'Hồ Chí Minh', 'Tân Bình', NULL, 'Khu v?c Tân Bình', NULL, NULL, 1, 0, 0, 1, 4513, 0, 1, '2026-04-07 08:24:41.598754', '2026-04-07 08:24:41.598754', 7),
(15, 'Bán nhà Hiếm phố Thái Hà ngõ ô tô .Diện tích 60m,4 tầng nội thất đẹp.', 'Ô TÔ 4 CHỖ ĐỖ CỔNG - RỘNG - PHỐ VIP THÁI HÀ - HÀNG HIẾM - DÂN XÂY Mô tả: + Nhà nằm ở vị trí đẹp, ô tô đỗ cửa, khu phố hiêm nhà bán, giao với các phố vip Thái Thịnh ,Chùa Bộc,Tây Sơn,Nguyễn Lương Bằng... Nhà còn mới đẹp, thiết kế hiện đại, khoa học, chủ mới mua về chỉ việc xách vali vào ở. + Giao thông di chuyển thuận tiện, tiện ích xung quanh ngập tràn. Thiết kế: - Tầng 1: Sân để xe rông, phòng khách, bếp, WC. - Tầng 2, 3: Mỗi tầng 2 phòng ngủ, wc. - Tầng 4: Phòng thờ, sân phơi, phòng đọc sách. Giá nhỉnh 16 tỷ Sổ đỏ chính chủ, sẵn sàng bàn giao Liên hệ e Kim Chi: Cảm ơn quý khách quan tâm và đọc tin!\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 16500000000, 'VND', 60.00, NULL, NULL, NULL, 'Hà Nội', 'Đống Đa', 'Quang Trung', 'Thái Hà', NULL, NULL, 0, 0, 1, 1, 3959, 0, 1, '2026-04-07 08:24:41.600101', '2026-04-07 08:24:41.600101', 8),
(16, 'Bán gấp Nhà riêng 72m2, 7,5 tỷ tại Ngô Gia Tự, Việt Hưng, Long Biên, Hà Nội', 'Nhà riêng tại Ngô Gia Tự, Phường Việt Hưng, Long Biên, Hà Nội, là một lựa chọn lý tưởng cho những ai đang tìm kiếm không gian sống thoải mái và tiện nghi. Với diện tích 72m2, ngôi nhà có thiết kế 3 tầng gồm 6 phòng ngủ và 3 phòng tắm, đáp ứng đầy đủ nhu cầu sinh hoạt của gia đình. - Diện tích: 72m2 - Giá: 7,5 tỷ VND - Số tầng: 3 - Số phòng ngủ: 6PN - Số phòng tắm: 3WC - Mặt tiền: 3,5m - Ngõ vào rộng: 3m - Nội thất đầy đủ: điều hòa, giường, tủ lạnh... Điểm đặc sắc: - Pháp lý đầy đủ - Mặt tiền phù hợp cho kinh doanh - Phong thủy tốt - Ngõ vào rộng rãi, thuận tiện cho xe ô tô di chuyển Tiện ích xung quanh: - Gần công viên Long Biên và Việt Hưng - Siêu thị WinMart+ - Bệnh viện đa khoa Đức Giang - Trường mầm non Montessori Kinder Paradise và Lá Phong Xanh Ban Mai Để biết thêm thông tin chi tiết, vui lòng liên hệ Chính Long Biên qua số điện thoại [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7500000000, 'VND', 72.00, NULL, 3, NULL, 'Hà Nội', 'Long Biên', 'Việt Hưng', 'Ngô Gia Tự', NULL, NULL, 1, 0, 0, 1, 1191, 0, 1, '2026-04-07 08:24:41.601802', '2026-04-07 08:24:41.601802', 9),
(17, 'Chính chủ cần bán lô đất sát tuyến Metro đối diện cổng chính ĐHQG nhỉnh 2 tỷ full thổ cư', 'Tôi Chính Chủ cần bán mảnh đất nền đối diện cổng Trường Đại Học Quốc Gia Hà Nội tại Hoà Lạc , gần Đại Học FPT - Cách Trung Tâm Hà Nội 20 phút Di chuyển. Hiện tại lô đất bên cạnh đang xây căn hộ cho thuê doanh thu 84tr/tháng.(90m xây 7 tầng, mỗi tầng 4 phòng) Do cần tiền gấp nên tôi bán rẻ mảnh đất này chỉ hơn 2 tỷ đồng Diện Tích : 82m ( full thổ cư ) Vị trí : Lô đất nằm gần ngay trục chính đường chính 7m, đối diện cổng chính trường Đại Học Quốc Gia , xe oto 8 tấn có thể vào tận cửa.k\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2000000000, 'VND', 82.00, NULL, NULL, NULL, 'Hà Nội', 'Thạch Thất', 'Tiến Xuân', 'Khu v?c Tiến Xuân', NULL, NULL, 1, 0, 0, 0, 8141, 1, 1, '2026-04-07 08:24:41.603610', '2026-04-07 08:24:41.603610', 10),
(18, 'Kẹt tiền, cần bán gấp đất mặt tiền Quốc lộ 53, thuộc xã Long Phước, huyện Long Hồ, tỉnh Vĩnh Long', 'Kẹt tiền, cần bán gấp đất mặt tiền Quốc lộ 53, thuộc xã Long Phước, huyện Long Hồ, tỉnh Vĩnh Long. Chiều rộng mặt tiền 21m, khu vực dân cư đông đúc, tiện kinh doanh mọi ngành nghề DT đất 3.912 m2, trong đó: ONT 3.585m2, CLN 327m2. Giá chuyển nhượng: 66 tỷ đồng, thương lượng nhẹ.\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 120000000, 'VND', 3912.00, NULL, NULL, NULL, 'Vĩnh Long', 'Long Hồ', 'Long Phước', 'Quốc Lộ 53', NULL, NULL, 0, 0, 1, 1, 9943, 0, 1, '2026-04-07 08:24:41.606617', '2026-04-07 08:24:41.606617', 11),
(19, 'HÀNG XÓM MINH KHAI.SỔ ĐỎ 28 M.5 TẦNG.GIÁ 4.900', 'Hàng xóm Minh Khai. DT 28m .5tầng. Sổ đỏ. Giá 4.9tỷ. Cách ô tô 15 m. Pháp lý: Sổ đỏ chính chủ. Giá bán: 4.9Tỷ (Có bớt ) Thiết kế hợp lý, nhà gần như mới Tầng 1: Phòng khách + bếp + để xe + WC. Tầng 2, 3.4 Mỗi tầng 1 phòng ngủ rộng + WC + ban công thoáng. Tầng 4: 1 phòng + khu phơi đồ, giặt + ban công rộng Chủ nhà thiện chí bán để chuyển khu vực sinh sống.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 4900000000, 'VND', 28.00, 3, 3, 4, 'Hà Nội', 'Hai Bà Trưng', 'Minh Khai', 'Minh Khai', NULL, NULL, 0, 0, 0, 0, 7075, 0, 1, '2026-04-07 08:24:41.607735', '2026-04-07 08:24:41.607735', 12),
(20, 'Chính chủ gửi bán căn hộ view vườn hoa, nội thất tiền tỷ chỉ 5.35 tỷ', 'Chính chủ gửi bán căn hộ view vườn hoa, nội thất tiền tỷ chỉ 5.35 tỷ. - Chung cư khu đô thị Việt Hưng - Long Biên. Diện tích: 97m2 | 3PN | 2WC | Hướng đẹp ban công cực thoáng. Điểm nổi bật: Căn góc 2 mặt thoáng, ánh sáng tràn ngập. Ban công phủ hoa không gian sống như resort tại gia. Full nội thất cao cấp nhập khẩu, gia chủ đầu tư tiền tỷ, khách chỉ việc xách vali về ở. Thiết kế hiện đại, tối ưu không gian gió mát tự nhiên quanh năm. Khu dân cư trí thức, yên tĩnh thích hợp để ở lâu dài hoặc đầu tư giữ tài sản. Vị trí trung tâm: Nằm ngay phố Nguyễn Cao Luyện, khu đô thị Việt Hưng. Giao thông thuận tiện, thông ra Nguyễn Văn Cừ, Nguyễn Văn Linh, cầu Chương Dương, cầu Vĩnh Tuy. Gần công viên, trường học, trung tâm thương mại Vincom Long Biên. Sổ đỏ chính chủ pháp lý sạch sẵn sàng giao dịch ngay. Gửi xe rộng rãi, an ninh tốt, dịch vụ thân thiện.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5350000000, 'VND', 97.00, 3, 2, NULL, 'Hà Nội', 'Long Biên', 'Đức Giang', 'Nguyễn Cao Luyện', NULL, NULL, 1, 0, 1, 0, 4659, 0, 1, '2026-04-07 08:24:41.609241', '2026-04-07 08:24:41.609241', 3),
(21, 'Hiếm nhà 2 tầng MT trục số Hoàng Hữu Nam đường nhựa 12m, 5x28m, Khu vực an ninh, tiện ích vây quanh', 'Nhà 2 tầng MT trục số Hoàng Hữu Nam. Vị trí và tiện ích: Siêu thị, cửa hàng tiện lợi bán kính 200m, cách ngã 3 Mỹ Thành 500m. Có thể cải tạo làm nhà ở hoặc xây chdv khai thác. Nhà 1 trệt 1 lầu: 3PN, 3WC, sân trước, sân sau. Diện tích: 140m2 (5x28). Hướng: Bắc. Sổ hồng hoàn công. Giá bán: 8.3 tỷ giảm còn 7. xx tỷ[phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7990000000, 'VND', 140.00, 3, 3, NULL, 'Hồ Chí Minh', 'Thủ Đức', 'Long Thạnh Mỹ', 'Khu v?c Long Thạnh Mỹ', NULL, NULL, 1, 0, 0, 1, 7876, 0, 1, '2026-04-07 08:24:41.610755', '2026-04-07 08:24:41.610755', 4),
(22, 'SỞ HỮU NGAY CĂN C6-144 SUN URBAN CITY', 'SỞ HỮU NGAY CĂN C6-144 SUN URBAN CITY Townhouse 4m mặt tiền vị trí vàng trong phân khu thấp tầng Sun Urban City. Diện tích đất: 60m² Diện tích xây dựng: 234.9m² Số tầng: 3,5 tầng hiện đại Tổng giá trị: 7,19 tỷ đồng Ưu đãi vay 0% lãi suất trong 36 tháng Tổng chiết khấu hấp dẫn lên tới 20% TT sớm nhận CK lên tới 18% Ngoài ra còn được tặng thêm QUÀ TẶNG TÂN GIA VỀ Ở SỚM Liền kề Biệt thự: 400 470 924 triệu Lý do không thể bỏ lỡ C6-144: Vị trí đắc địa, gần công viên trung tâm, trục đường chính 25m. Tiềm năng tăng giá mạnh khi hạ tầng đồng bộ. Thích hợp vừa ở, vừa kinh doanh sinh lời. Chính sách thanh toán linh hoạt hỗ trợ tài chính tối đa. Liên hệ ngay hôm nay để được nhận quà tặng tân gia và ưu đãi đặc biệt! Inbox/Zalo:\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7190000000, 'VND', 60.00, NULL, NULL, 4, 'Hà Nam', 'Phủ Lý', 'Lam Hạ', 'Lê Công Thanh', NULL, NULL, 1, 0, 0, 0, 4765, 0, 1, '2026-04-07 08:24:41.612772', '2026-04-07 08:24:41.612772', 5),
(23, 'Bán NR 4PN, 4WC, 51m2 tại Lạc Long Quân, p6, Tân Bình, 12,9 tỷ giá cực chất', 'Nhà riêng 4 tầng tại Lạc Long Quân, Phường 6, Tân Bình, Hồ Chí Minh với diện tích 51m2. Cấu trúc gồm 4PN + 4WC + bếp, thiết kế hiện đại, đầy đủ nội thất. Mặt tiền rộng 3.8m, đường vào 5m, phù hợp cho gia đình hoặc kinh doanh. Giá bán 12,9 tỷ VND. Nội thất bao gồm điều hòa, giường, tủ lạnh... Pháp lý đầy đủ. Gần các tiện ích như công viên Bàu Cát 2, siêu thị Mẹ & Bé Con Cưng, bệnh viện Quốc tế Queen, và trường mầm non Ngôi Nhà Hạnh Phúc. Liên hệ ngay để biết thêm chi tiết: [phone_number], Nguyễn Quốc Nam.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 12900000000, 'VND', 51.00, 4, 4, NULL, 'Hồ Chí Minh', 'Tân Bình', '6', 'Lạc Long Quân', NULL, NULL, 0, 0, 0, 0, 9109, 0, 1, '2026-04-07 08:24:41.613771', '2026-04-07 08:24:41.613771', 6),
(24, '(Sở hữu) Đất MT Đường 7m5 Bàu Vàng 6 gần Vietcombank Liên Chiểu | 100m2 sạch đẹp', '(Sở hữu) Đất MT đường 7m5 Bàu Vàng 6 gần Vietcombank Liên Chiểu | 100m2 sạch đẹp. + Vị trí: Bàu Vàng 6, Hòa Khánh Bắc, Liên Chiểu. Cách cổng KCN Hòa Khánh 200m, Cao Đẳng Kinh Tế và ĐH Bách Khoa 1km. Cách đường Phạm Văn Ngôn 25m. + Đường: 7m5 vỉa hè 3m. + DT đất: 100m² (5x20) sạch đẹp. + Hướng; Đông Bắc. + Pháp lý sổ hồng. + Giá trị khai thác: Mua ở; xây căn hộ, nhà trọ. Khu dân cư đông đúc, TT Liên Chiểu. Giá bán chỉ 3.99 Tỷ còn có thương lượng nhẹ.\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 3990000000, 'VND', 100.00, NULL, NULL, NULL, 'Đà Nẵng', 'Liên Chiểu', 'Hòa Khánh Bắc', 'Bàu Vàng 6', NULL, NULL, 1, 1, 0, 1, 3096, 0, 1, '2026-04-07 08:24:41.616284', '2026-04-07 08:24:41.616284', 7),
(25, 'Bán đất mặt tiền sông - đường số 52 - khu dân cư 10 mẫu - đối diện lakeview city.', 'bán đất mặt tiền sông - đường số 52 - khu dân cư 10 mẫu - đối diện lakeview city phường bình trưng đông quận 2 dt: 181m ( ngang 10 x 15m, nở hậu 21m ) đất đôi diện sông giồng đường 12m hướng bắc sổ hồng bán 23 tỷ lh [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 23000000000, 'VND', 181.00, NULL, NULL, NULL, 'Hồ Chí Minh', 'Thủ Đức', 'Bình Trưng Đông', 'Khu v?c Bình Trưng Đông', NULL, NULL, 1, 1, 0, 0, 8859, 1, 1, '2026-04-07 08:24:41.617377', '2026-04-07 08:24:41.617377', 8),
(26, '1Tỷ280 - có ngay lô đất ngõ 40 Trương Văn Lực, Hồng Bàng, Hải Phòng. Diện tích 46,1m2', 'Lô đất đẹp trung tâm phường Hùng Vương, Hồng Bàng. Giá chỉ từ 1. X TỶ Cơ hội vàng cho an cư & đầu tư! Diện tích: 46,1m | Mặt tiền: 5,8m | Hướng Đông Bắc. Vị trí đẹp Cách Vinhomes Imperia chỉ 1,5km. Gần trường học, chợ, bệnh viện, Mega Market 5 phút vào trung tâm. Phù hợp gia đình làm việc tại KCN Vsip, Nomura (35km). Sổ đỏ chính chủ Pháp lý chuẩn Xây ở ngay, không phải lăn tăn! Liên hệ: Nguyễn Đương: Gọi ngay để xem đất và chốt giá tốt.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 1268000000, 'VND', 46.10, NULL, NULL, NULL, 'Hải Phòng', 'Hồng Bàng', 'Hùng Vương', 'Trương Văn Lực', NULL, NULL, 1, 0, 1, 0, 10054, 0, 1, '2026-04-07 08:24:41.618882', '2026-04-07 08:24:41.618882', 9),
(27, 'Nhận booking nhà phố - biệt thự tại Gladia Khang Điền. Số lượng giới hạn, sổ hồng từng căn', 'Gladia là khu biệt thự nhà phố cao cấp do Khang Điền hợp tác cùng Keppel Land (Singapore) phát triển, tạo nên chuẩn mực sống mới dành cho giới thượng lưu. Tọa lạc ngay mặt tiền Võ Chí Công, Bình Trưng Đông, TP. Thủ Đức vị trí chiến lược, kết nối nhanh chóng đến trung tâm và các khu đô thị trọng điểm. - Quy mô dự án: Nhà phố liền kề: 95m², 133m² (41 căn). Biệt thự tứ lập: 200m², 250m² (16 căn). Biệt thự song lập: 102m² (86 căn). - Một loạt các tiện ích nội khu đẳng cấp, chuẩn 5 sao: Hồ bơi tràn viền, công viên cây xanh, sân tennis, khu thể thao đa năng,... Tất cả được vận hành bởi Tập đoàn CBRE - công ty đầu tư và dịch vụ bất động sản thương mại lớn nhất thế giới. Chính sách bán hàng giai đoạn 1 ưu đãi: Thanh toán linh hoạt, ngân hàng hỗ trợ vay ưu đãi, pháp lý hoàn thiện. Anh/chị liên hệ em Thảo 0775328*** để nhận thông tin chi tiết và tư vấn chính sách bán hàng, lịch thanh toán.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 20000000000, 'VND', 100.00, 3, 3, NULL, 'Hồ Chí Minh', 'Thủ Đức', NULL, 'Jamila Khang Điền', NULL, NULL, 0, 0, 1, 0, 6957, 0, 1, '2026-04-07 08:24:41.620925', '2026-04-07 08:24:41.620925', 10),
(28, 'Bán CH X2 Đại Kim, 5 tỷ, 85m2, 3PN, 2WC, giá siêu hời, Hoàng Mai, Hà Nội', 'Chung cư X2 Đại Kim nằm ở Đường Trần Hòa, Phường Đại Kim, Quận Hoàng Mai, Hà Nội, là một lựa chọn lý tưởng cho những ai tìm kiếm không gian sống hiện đại và tiện nghi. Với diện tích 85m2, căn hộ này bao gồm 3 phòng ngủ và 2 phòng tắm, hoàn hảo cho gia đình hoặc những người yêu thích không gian rộng rãi. Căn hộ có mức giá 5 tỷ VND, đi kèm với nhiều tiện ích nổi bật như khu vui chơi trẻ em, trung tâm thương mại dịch vụ, và hệ thống mầm non ngay trong khuôn viên. Dự án được đầu tư bởi Tổng công ty đầu tư và phát triển nhà - Bộ Quốc Phòng, đảm bảo chất lượng và thiết kế hiện đại với 3 tòa nhà cao 28 tầng, 3 tầng hầm và 3 tầng thương mại. Chi tiết dự án: - **Vị trí:** Phường Đại Kim, Quận Hoàng Mai, Hà Nội (gần đường Vành Đai 3, các trục đường Giải Phóng, Đại La, Trường Chinh) - **Nhà đầu tư:** Tổng công ty đầu tư và phát triển nhà - Bộ Quốc Phòng - **Tiện ích:** Khu vui chơi trẻ em, trung tâm thương mại dịch vụ, hệ thống mầm non, phòng Fitness (gym, spa, yoga), công viên cây xanh, khu vực giao lưu văn hóa - **Thiết kế:** 3 tòa nhà cao 28 tầng, 3 tầng hầm, 3 tầng thương mại, 750 căn hộ, diện tích từ 77m2 đến 122m2, thiết kế hiện đại, 10 căn hộ/mặt sàn, 4 thang máy tốc độ cao. Gần căn hộ có nhiều tiện ích như trường học, bệnh viện và siêu thị, thuận tiện cho cuộc sống hàng ngày. Để biết thêm thông tin và được tư vấn miễn phí, liên hệ ngay với Lê Thị Quỳnh My qua số điện thoại [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5000000000, 'VND', 85.00, NULL, NULL, NULL, 'Hà Nội', 'Hoàng Mai', 'Đại Kim', 'X2 Đại Kim', NULL, NULL, 1, 0, 0, 0, 10556, 1, 1, '2026-04-07 08:24:41.622471', '2026-04-07 08:24:41.622471', 11),
(29, '2 Tầng 15m 2 mặt tiền hẻm Hoàng Hoa Thám, P. 5 Phú Nhuận 3.05 tỷ', 'Thông tin căn nhà anh/chị quan tâm. Địa chỉ: 100/ Thích Quảng Đức (ĐC mới: 247/75C Hoàng Hoa Thám), P. 5, Quận Phú Nhuận. Diện tích: 15m² (3 x 5m, vuông vức, công nhận đủ). Kết cấu: Trệt, lầu BTCT, gồm PN master, 2WC, PK, bếp, ban công, cửa sau nhà thoáng sáng. Nội thất: Tặng full nội thất (sofa, tủ bếp, máy lạnh, tủ lạnh, máy giặt, giường, tủ áo, bàn trang điểm). Vị trí: 2 mặt tiền hẻm trước sau, xe hơi cách vài bước, ngay Hoàng Hoa Thám giáp Thích Quảng Đức, Nguyễn Thượng Hiền, tiện ích đầy đủ. Khai thác: Cho thuê 8tr/tháng (nay vừa lấy nhà trống). Giá bán: 3.05 tỷ. Pháp lý: Sổ hồng A4 riêng, hoàn công đủ, công chứng nhanh. Liên hệ ngay để em dẫn anh/chị đi xem, căn hiếm 2 MT hẻm giá rẻ nhất khu Phú Nhuận!\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 3050000000, 'VND', 15.00, 2, 2, 2, 'Hồ Chí Minh', 'Phú Nhuận', '5', 'Hoàng Hoa Thám', NULL, NULL, 0, 0, 0, 0, 100, 0, 1, '2026-04-07 08:24:41.625993', '2026-04-07 08:24:41.625993', 12),
(30, 'Chính chủ bán 100m2 đất thổ cư trung tâm Bà Rịa ngay QL56 cao tốc Biên Hòa Vũng tàu giá đầu tư', 'Đất nền dự án Lan Anh 2 và 5 tọa lạc tại đường 56, Xã Hòa Long, Bà Rịa, Bà Rịa Vũng Tàu, là một cơ hội đầu tư hấp dẫn với nhiều tiện ích. - Diện tích 100m2, 200m2 lý tưởng cho xây dựng nhà phố hoặc biệt thự. - Giá bán 1 tỷ đồng, phù hợp với nhiều đối tượng khách hàng. - Pháp lý đầy đủ, đảm bảo an toàn cho giao dịch. - Khu vực có thiết kế hiện đại, không gian xanh mát. - Tiện ích nội khu phong phú: Khu phố chợ, trung tâm thể dục thể thao, công viên cây xanh, trường học quốc tế. Điểm cộng: - Vị trí đắc địa nằm ngay cạnh Quốc Lộ 56, thuận lợi di chuyển. - Gần trung tâm hành chính Bà Rịa, chỉ mất 20 phút đến TP. Vũng Tàu. - Kết nối nhanh chóng đến sân bay Long Thành và cao tốc Biên Hòa - Vũng Tàu. - Không gian sống thoải mái, gần gũi với thiên nhiên. Thông tin dự án: - Dự án Lan Anh 2 và 5 do Công ty TNHH MTV Lan Anh đầu tư. - Tiện ích đồng bộ: Gần siêu thị Coopmart, bệnh viện đa khoa tỉnh 900 giường, và khu du lịch Long Hải chỉ 10 phút. Để biết thêm thông tin chi tiết và được tư vấn miễn phí, liên hệ Thu Huyền qua số điện thoại [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 1000000000, 'VND', 100.00, NULL, NULL, NULL, 'Bà Rịa - Vũng Tàu', 'Bà Rịa', NULL, 'Lan Anh Residential', NULL, NULL, 1, 0, 1, 1, 4049, 0, 1, '2026-04-07 08:24:41.627027', '2026-04-07 08:24:41.627027', 3),
(31, '55M TT THANH XUÂN, GARA Ô TÔ, 2 MẶT THOÁNG, VỊ TRÍ KD. GIÁ CHỈ 16.9 TỶ', 'HOT! BÁN NHÀ 55M TRUNG TÂM THANH XUÂN GARA Ô TÔ, 2 MẶT THOÁNG, KINH DOANH ĐỈNH GIÁ CHỈ 16.9 TỶ Cơ hội sở hữu căn nhà đẹp hiếm có tại trung tâm quận Thanh Xuân, Hà Nội vừa ở, vừa kinh doanh, gara ô tô, sổ đỏ chính chủ, Thông tin chi tiết: Diện tích: 55m² sổ đỏ chính chủ, nở hậu Giá bán: 16.9 tỷ Thiết kế: Tầng 1: Gara ô tô, phòng khách, bếp, WC Tầng 24: Mỗi tầng 2 phòng ngủ + WC (Tổng 6PN) Tầng 5: Phòng thờ + sân phơi Vị trí đẹp: Ô tô qua cửa, trước nhà thoáng vĩnh viễn, trung tâm Thanh Xuân. Ưu điểm nổi bật: Kết hợp ở và kinh doanh cực kỳ hợp lý Giao thông thuận tiện, gần chợ, trường học, trung tâm thương mại Nhà xây chắc chắn, phong thủy đẹp, không lỗi Liên hệ ngay: Mr. Lực để xem nhà thực tế.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 16900000000, 'VND', 55.00, 6, 5, 5, 'Hà Nội', 'Thanh Xuân', 'Thanh Xuân Bắc', 'Khu v?c Thanh Xuân Bắc', NULL, NULL, 1, 0, 0, 0, 11360, 0, 1, '2026-04-07 08:24:41.629550', '2026-04-07 08:24:41.629550', 4),
(32, 'Bán nhà 2 tầng hẻm ô tô đường Củ Chi giá 6tỷ6', 'Bán nhà 2 tầng hẻm xe hơi đường Củ Chi - Giá 6.6 tỷ - Vĩnh Hải - TP Nha Trang. - Diện tích 118m2 ngang 6m. - 3p ra biển - hẻm ô tô - cách đường chính Củ Chi 60m. - Nhà 2 tầng gồm 04 phòng 2 wc. - Nhà hướng Tây cách biển chỉ 400m, đi bộ ra bãi tắm. - 2p ra chợ Vĩnh Hải. - Sổ hồng chính chủ. Giá bán chỉ 6,6 tỷ còn thương lượng. LH [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 6600000000, 'VND', 118.00, 4, 2, NULL, 'Khánh Hòa', 'Nha Trang', 'Vĩnh Hải', 'Củ Chi', NULL, NULL, 0, 0, 0, 0, 7928, 0, 1, '2026-04-07 08:24:41.632054', '2026-04-07 08:24:41.632054', 5),
(33, 'Chính chủ cần tiền bán gấp biệt thự bích liên wyndham giá tốt khoáng nóng tận căn kd ngay', 'Gia đình chuyển đổi mục đích kinh doanh cần bán gấp căn BT Bích Liên 1 tầng bàn giao full nội thất đồ rời đang kinh doanh ổn định lợi nhuận 400-500tr/năm, sẵn sổ đỏ, giá có đàm phán thương lượng LH xem thực tế và đàm phán giá cả: Em Phú [phone_number] Vị trí đắc địa: Chỉ 60 từ Hà Nội, nghỉ dưỡng khoáng nóng Onsen tự nhiên. Pháp lý chuẩn chỉnh: Nhận nhà full nội thất, sổ đỏ trao tay. CĐT uy tín dự án vận hành ổn định, quy mô lớn, tiện ích chuẩn quốc tế. Dòng tiền chắc chắn: Lợi nhuận 400%/năm, quản lý bởi Wyndham 5*. TIỆN ÍCH ĐỈNH CAO King Garden Onsen Nhật Bản, bể bơi khoáng nóng vô cực lớn nhất miền Bắc. 5 nhà hàng lớn, phố cổ Shophouse, quảng trường sự kiện. Đầy đủ dịch vụ: Cafe , Spa , Golf , Tennis , khu vui chơi trẻ em . Vườn Vua Resort & Villas Đầu tư nghỉ dưỡng sức khỏe, sinh lời bền vững. LH xem thực tế và đàm phán giá cả: Em Phú [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 4500000000, 'VND', 258.00, 2, 2, NULL, 'Phú Thọ', 'Thanh Thủy', 'Đồng Trung', 'Vườn Vua Resort & Villas', NULL, NULL, 0, 0, 0, 1, 1268, 0, 1, '2026-04-07 08:24:41.633077', '2026-04-07 08:24:41.633077', 6),
(34, 'Đất trung tâm phố cổ Hội An, giá chỉ 53 triệu/ m2, sổ hồng công chứng ngay, đường 7m5', 'Siêu phẩm đất nền trung tâm TP. Hội An. Ra mắt lô đất ngay trung tâm phố cổ Hội An 39 lô đất siêu đẹp chủ đầu tư. Vị trí trung tâm thành phố Hội An cách biển chỉ 10 phút di chuyển. Khu vực tiềm năng phát triển villa, homestay, nghỉ dưỡng cao cấp ngay Phố Cổ. Pháp lý rõ ràng sổ hồng riêng bán đến công chứng ngay. Ngân Hàng hỗ trợ cho vay 70% với lãi suất ưu đãi. Diện tích chuẩn đẹp: 100m² (5x20)m2. Giá: 53 tr/m2 - 57 tr/m2. Gần biển, gần phố cổ, xung quanh đầy đủ tiện ích: Khu du lịch, chợ đêm, nhà hàng, khách sạn. Di chuyển nhanh ra biển An Bàng, Cửa Đại. Thích hợp đầu tư, xây dựng ở, cho thuê, kinh doanh nghỉ dưỡng. Cơ hội đầu tư sinh lời cao vị trí vàng ngay lòng di sản!\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5300000000, 'VND', 100.00, NULL, NULL, NULL, 'Quảng Nam', 'Hội An', 'Cẩm Phô', 'Lê Hồng Phong', NULL, NULL, 1, 0, 1, 0, 2294, 0, 1, '2026-04-07 08:24:41.634167', '2026-04-07 08:24:41.634167', 7),
(35, 'Nhà hẻm xe tải với dt 48m2. 4 tầng. ngay hương lộ 2. 5p ra ql1a. g.i.á chỉ 6 tỷ nhỉnh xíu xiu', 'nhà hẻm xe tải với dt 48m2. 4 tầng. ngay hương lộ 2. 5p ra ql1a. g. I. Á chỉ 6 tỷ nhỉnh xíu xiu trường học. bệnh viện. siêu thị. tiện ích không thiếu thứ gì chỉ thiếu người vô ở thôi ạ gặp em huy (tư vấn 24/7) mua vàng thì lỗ, mua thổ thì lời!! 98571\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 6100000000, 'VND', 48.00, 4, 3, NULL, 'Hồ Chí Minh', 'Bình Tân', 'Bình Trị Đông', 'Hương lộ 2', NULL, NULL, 1, 1, 1, 0, 5494, 0, 1, '2026-04-07 08:24:41.636206', '2026-04-07 08:24:41.636206', 8),
(36, 'Bán toà nhà dòng tiền CcMini tốt,ô tô đậu trước cửa nhà,vị trí đắc địa,kín phòng quận Bắc Từ Liêm.', 'Bán toà CCMN Phú Diễn, dòng tiền 120t/tháng. Mô tả: A Quân gửi bán toà CCMN đường Cầu Diễn quận Bắc Từ Liêm - Hà Nội. - Dòng tiền cao hàng tháng 120t/tháng. - Vị trí đắc địa giá trị tài sản tăng nhanh,ô tô đỗ cửa. - Khu vực đông dân cư luôn thiếu phòng không lo thiếu khách. - Phòng cháy chữa cháy đầy đủ và đạt chuẩn. - Sổ đẹp pháp lý chuẩn sẵn giao dịch. Gọi ngay Mr Lai: để được tư vấn miễn phí và xem nhà trực tiếp. Trân trọng!\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 23500000000, 'VND', 75.00, NULL, NULL, NULL, 'Hà Nội', 'Bắc Từ Liêm', 'Phú Diễn', 'Cầu Diễn', NULL, NULL, 1, 0, 0, 0, 6055, 0, 1, '2026-04-07 08:24:41.637211', '2026-04-07 08:24:41.637211', 9),
(37, 'Bán nhà Nguyễn Chánh Cầu Giấy, 3 ô tô tránh, 70m² x 6T, MT 4.7m, 1 nhà ra phố giá nhỉnh 34.9 tỷ', 'KINH DOANH SẦM UẤT MỌI LOẠI HÌNH CẦN BÁN NHÀ SIÊU PHẨM PHỐ NGUYỄN CHÁNH - TRUNG TÂM CẦU GIẤY, KHU PHÂN LÔ QUÂN ĐỘI, NGÕ 3 Ô TÔ TRÁNH, GARA Ô TÔ VÀO TẬN NHÀ, KHU DÂN TRÍ CAO, AN NINH TUYỆT ĐỐI, GIAO THÔNG THUẬN TIỆN KẾT NỐI TRUNG KÍNH - TRẦN DUY HƯNG - MẠC THÁI TỔ. Mô tả chi tiết: Diện tích: 70m² Mặt tiền: 4.7m Kết cấu: 6 tầng thang máy khung cột bê tông chắc chắn Thiết kế: - Tầng 1,2,3: Thông sàn, Gara ô tô hoặc kinh doanh. - Tầng 4-6: Mỗi tầng 2 phòng, WC khép kín. Nhà 2 mặt thoáng trước sau, phòng nào cũng tràn ngập ánh sáng tự nhiên. Ngõ rộng 3 ô tô tránh nhau, khu phân lô chuẩn, an ninh tốt, dân trí cao. Phù hợp: ở, làm văn phòng, cho thuê, giữ tài sản, hoặc đầu tư đều sinh lời tốt. Khu vực bao quanh là phân lô quân đội, công chức, hạ tầng đồng bộ, gần công viên Cầu Giấy, siêu thị Big C, các trường điểm Nghĩa Đô - Dịch Vọng A. Giá chào bán: nhỉnh 34.9 tỷ (có thương lượng trực tiếp với chủ). Sổ đỏ chính chủ phân lô, pháp lý rõ ràng, sẵn sàng giao dịch. Liên hệ: Minh Tuấn Môi giới bán & cho thuê nhà đất khu vực Cầu Giấy, Đống Đa, Tây Hồ, Ba Đình)\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 34900000000, 'VND', 70.00, 6, 6, 6, 'Hà Nội', 'Cầu Giấy', 'Trung Hòa', 'Nguyễn Chánh', NULL, NULL, 1, 0, 0, 0, 4407, 0, 1, '2026-04-07 08:24:41.639717', '2026-04-07 08:24:41.639717', 10),
(38, '2tỷ39 căn 2PN 2WC - Happy One Central - TP. HCM sầm uất. CK 6.5%,miễn 36 tháng PQL, tặng thêm 168tr', 'Sở hữu ngay căn hộ cao cấp nhất Bình Dương - Happy One Central nhận nhà ở và cho thuê ngay. Vị trí liền kề sân vận động Gò Đậu, ngay trung tâm của TP. Thủ Dầu Một. LH ngay PKD : [phone_number] để hỗ trợ tận tình Nếu khách hàng chưa có nhu cầu ở, đơn vị Vạn Xuân Property sẽ hỗ trợ khách hàng cho thuê lại với mức giá cao tại khu vực trung tâm: - Căn 1PN - 1WC cho thuê 10 - 12tr/tháng. - Căn 2PN - 2WC cho thuê 14 - 17tr/tháng. Đủ giỏ hàng cho khách hàng lựa chọn - Căn 1PN 49-53m giá từ 2 tỷ - Căn 2PN 69-78m giá từ 2tỷ39 LH ngay PKD : [phone_number] để hỗ trợ tận tình Trải nghiệm hệ thống tiện ích ngay bên dưới chân toà nhà với các thương hiệu lớn: 7 - Eleven, Texas, Winmart, Highlands. Thiết kế 3 hầm xe rộng rãi, nhiều chỗ để, tích hợp bãi đổ xe thông minh thuận tiện cho quý cư dân. Nhận nhà mới ở ngay, bàn giao sổ hồng sở hữu lâu dài sau 3 - 4 tháng nhận nhà. Miễn phí toàn bộ hệ thống 68 tiện ích được thiết kế theo phong cách Singapore gồm: Hồ bơi tràn bờ, vườn trên không, Golf 3D, bida, gym, Karaoke, Phòng chiếu phim, cầu kính trên không, Sky bar, vườn thiền, đài quan sát. Đặc biệt quý khách hàng mua trong dịp này sẽ được tặng ngay: Máy lạnh Daikin Inverter, bếp từ 3 vùng nấu, máy hút mùi Hafele, thiết bị vệ sinh Kohler, khoá cửa vân tay Hafele và gói nhà thông minh Smarthome. Thiết kế căn hộ thông thoáng, hiện đại theo tiêu chuẩn Singapore, đón gió, ánh sáng tự nhiên. 100% căn hộ đều có ban công, logia, cửa sổ lớn để ngắm toàn cảnh thành phố. LH ngay PKD : [phone_number] để hỗ trợ tận tình\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2390000000, 'VND', 69.00, 2, 2, NULL, 'Bình Dương', 'Thủ Dầu Một', 'Phú Hòa', 'Happy One Central', NULL, NULL, 0, 0, 0, 0, 7048, 0, 1, '2026-04-07 08:24:41.641725', '2026-04-07 08:24:41.641725', 11),
(39, '**Bán nhà MT đường Trần Văn Danh, phường 13, Tân Bình (4*22) 6PN, cổng ga T3', 'Bán nhà MT Trần Văn Danh, phường 13, Tân Bình (nay là phường Tân Bình) - DT : 4m x 22m | công nhận 88m² - tổng DTSD 269m². Nở hậu nhẹ, phong thủy tài lộc. - Hiện trạng: trệt, 3 lầu kiên cố, gồm 6 PN / 5 WC. Thiết kế rộng rãi, thoáng sáng, phù hợp để ở hoặc khai thác kinh doanh. - Vị trí: Khu dân cư hiện hữu, mặt tiền sầm uất, thuận tiện mở văn phòng, spa, căn hộ dịch vụ Cách sân bay chỉ vài phút di chuyển. - Giá bán: 14 tỷ 500 triệu. Liên hệ Tố Hữu để thương lượng trực tiếp chủ. ** NHÀ THẬT, THÔNG TIN CHÍNH XÁC ** -------------------------------------------------- DREAM HOME 79 - Tư vấn & hỗ trợ pháp lý BĐS chuyên sâu - Định giá - Đấu giá - Xử lý nợ xấu - Nhận đặt hàng tìm mua BĐS theo yêu cầu bán nhà phường 13 quận tân bình bán nhà mặt tiền tân bình bán nhà phường 12 tân bình ban nha mat tien tan binh ban nha phuong 13 quan tan binh ban nha phuong 13 tan binh bán nhà k300 tân bình bán nhà mặt tiền phạm phú thứ tân bình bán nhà mặt tiền trường chinh tân bình bán nhà mặt tiền âu cơ tân bình bán nhà mặt tiền đường đồng đen quận tân bình bán nhà đường đồng xoài phường 13 quận tân bình bán nhà mặt tiền tân hải ban nha mat tien quan tan binh bán nhà khu k300 phường 12 quận tân bình bán nhà mặt tiền quận tân bình bán nhà phường 13 tân bình nhà đất phường 13 tân bình\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 14500000000, 'VND', 88.00, NULL, 5, NULL, 'Hồ Chí Minh', 'Tân Bình', '13', 'Trần Văn Danh', NULL, NULL, 1, 0, 1, 0, 9204, 0, 1, '2026-04-07 08:24:41.643731', '2026-04-07 08:24:41.643731', 12),
(40, 'Chính chủ bán CH 4PN, DT 121.2m2, Golden Palm - 21 Lê Văn Lương tầng đẹp, giá 9.8 tỷ, LH [phone_number]', '+ Chính chủ bán căn hộ tại dự án Golden Palm - 21 Lê Văn Lương. + Vị trí đắc địa thuận tiện cho việc đi lại của mọi người. + Thiết kế hiện đại rộng rãi thoải mái. + Diện tích 121,2m2 (3 ngủ + 1 phụ, 2 vệ sinh). + Cửa ĐN, ban công TB + ĐB. + Nội thất cơ bản liền tường. + Có slot ô tô, sổ đỏ cất két. + Giá bán 9,8 tỷ có thương lượng. + Liên hệ [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 9800000000, 'VND', 121.20, 4, 2, NULL, 'Hà Nội', 'Thanh Xuân', 'Nhân Chính', 'Lê Văn Lương', NULL, NULL, 0, 0, 0, 0, 1609, 0, 1, '2026-04-07 08:24:41.645239', '2026-04-07 08:24:41.645239', 3),
(41, 'Bán CC 2PN, 2WC tại Ngọc Hồi, Hoàng Liệt, 3,3 tỷ, 70m2 giá siêu hời', 'CC này nằm tại Ngọc Hồi, Hoàng Liệt, Hoàng Mai, Hà Nội, có diện tích 70m2 với 2PN, 2WC. Cửa chính hướng Đông Nam và ban công Tây Bắc. Nội thất cơ bản, đã có sẵn một số đồ dùng cần thiết để dọn vào ở luôn. Giá bán là 3,3 tỷ VND, đây là cơ hội không thể bỏ lỡ cho những ai đang tìm kiếm một không gian sống thoải mái và hiện đại. Khu vực xung quanh. Gần các công viên như công viên Yên Sở và bến xe Nước Ngầm, cũng như các siêu thị như Winmart + 38BT1 Pháp Vân. Các trường học như trường mầm non Linh Đàm và trường THCS Hoàng Liệt, THPT Việt Nam - Ba Lan, Hoàng Liệt cũng nằm trong khu vực. Liên hệ ngay để được tư vấn miễn phí! Phạm Thị Thanh Hương - 090555587.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 3300000000, 'VND', 70.00, 2, 2, NULL, 'Hà Nội', 'Hoàng Mai', NULL, 'Khu v?c Hoàng Mai', NULL, NULL, 0, 0, 0, 0, 498, 0, 1, '2026-04-07 08:24:41.646307', '2026-04-07 08:24:41.646307', 4),
(42, 'Bán nhà 4 tầng đường VÕ THỊ THỪA, phường AN PHÚ ĐÔNG, Q12,dt 81m2(4,3x19),giá 5,9tỷ', 'Bán nhà 4 tầng đường VÕ THỊ THỪA, phường AN PHÚ ĐÔNG, Q12,dt 81m2(4,3x19),giá 5,9tỷ Nhà 1 trệt 3 lầu, sân tượng gồm 5PN, 4WC.Sổ hồng riêng, không bị quy hoạch, hoàn công đủ Vị trí Hẻm 7m thông đường Võ Thị Thừa, gần đường Nội QL1 và đường Bà Đ, Quốc Lộ 1A, gần Tu Viện Khánh An , Trường Đại Học Nguyễn Tất Thành, Rạch Thầy Bảo.Tiện ích đầy đủ. Liên hệ ngay làm việc trực tiếp với chính chủ. Cam kết thông tin chuẩn.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5900000000, 'VND', 81.00, 5, 4, 4, 'Hồ Chí Minh', '12', 'An Phú Đông', 'Khu v?c An Phú Đông', NULL, NULL, 0, 1, 0, 0, 11328, 0, 1, '2026-04-07 08:24:41.648394', '2026-04-07 08:24:41.648394', 5),
(43, 'Bán đất tại ĐT 765, Cẩm Mỹ, Đồng Nai, 22 tỷ, 15349 m2, 300m2 thổ cư, nhà cấp 4 200m2', 'Đất nền tại ĐT 765, Cẩm Mỹ, Đồng Nai, có diện tích rộng rãi 15349 m2, phù hợp cho nhiều mục đích sử dụng. + Diện tích lớn, 15349 m2, thuận tiện cho việc xây dựng hoặc đầu tư. + Mặt tiền rộng 35m, dễ dàng tiếp cận và phát triển kinh doanh. + Đường vào rộng 8m, dễ dàng di chuyển, đặc biệt phù hợp với xe ô tô. + Pháp lý đầy đủ, sổ đỏ/sổ hồng rõ ràng, đảm bảo quyền sở hữu. + Giá bán hợp lý 22 tỷ VND, cơ hội đầu tư tốt trong khu vực. - Điểm nhấn: Mặt tiền rộng phù hợp cho việc kinh doanh hoặc xây dựng nhà ở. Đường vào rộng rãi dễ dàng tiếp cận, tạo thuận lợi cho cuộc sống hàng ngày. Pháp lý đầy đủ giúp khách hàng yên tâm về tính hợp pháp. - Khu vực xung quanh: Liền kề Cây xăng Định Hường 3, ấp 5. Liên hệ Phin Tran qua số điện thoại [phone_number] để được tư vấn miễn phí.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 22000000000, 'VND', 15349.00, NULL, NULL, NULL, 'Đồng Nai', 'Cẩm Mỹ', 'Lâm San', 'ĐT 765', NULL, NULL, 0, 1, 0, 1, 9988, 0, 1, '2026-04-07 08:24:41.650402', '2026-04-07 08:24:41.650402', 6),
(44, 'Cần bán căn góc 3 bancon chung cư khang gia .2pn 2wc đã có sổ', 'CẦN BÁN CĂN HỘ KHANG GIA GÒ VẤP (Địa chỉ: Đường Số 45 ,P An Hội Tây Gò Vấp) Căn hộ đang cho thuê phong thuỷ hợp làm ăn, công việc gia đình đều ổn định thuận lợi. Diện tích: 73m (thông thủy) Gồm 2 phòng ngủ, 2 WC, bếp và 3 ban công thoáng mát Sổ hồng riêng, chính chủ lâu dài Nhà Trống Tiện Sửa Sang Decor theo ý thích. Giá bán: 2 tỷ 850 triệu ( bớt lộc)\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2850000000, 'VND', 73.00, 2, 2, NULL, 'Hồ Chí Minh', 'Gò Vấp', NULL, 'Khu v?c Gò Vấp', NULL, NULL, 1, 0, 0, 0, 9823, 0, 1, '2026-04-07 08:24:41.651907', '2026-04-07 08:24:41.651907', 7),
(45, 'bán nhà mặt tiền đường lê trọng tấn DT 5,8x21 hiện trạng cấp 4 bán 16,5 tỷ LH [phone_number] hiểu', 'Mặt Tiền đường Lê trọng Tấn, phường tây thạnh - Vị trí đẹp tiện kinh doanh. - Ngay sát bên bệnh viện hoàn Mỹ sắp đưa vào hoạt động. - DT: 5,8m x 21m nhà cấp 4 Giá bán 16,5 tỷ thương lượng nhẹ. Giá quá tốt để đầu tư ,hiện đang cho thuê 20tr LH: [phone_number] Hiểu\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 16500000000, 'VND', 124.00, 2, 2, NULL, 'Hồ Chí Minh', 'Tân Phú', 'Tây Thạnh', 'Lê Trọng Tấn', NULL, NULL, 1, 1, 0, 0, 3265, 0, 1, '2026-04-07 08:24:41.653423', '2026-04-07 08:24:41.653423', 8),
(46, 'Bán nhà ngõ 61 Hoàng Cầu, Đống Đa 80m2x6 Tầng Thang Máy, HIẾM CÓ- ĐẸP NHẤT khu PL ngay sau Quận Ủy', 'Tòa nhà 6 tầng thang máy cực kỳ ĐẸP, Mặt tiền RỘNG, ngay khu phân lô VIP 61 Hoàng Cầu -phía sau Quận Ủy, nơi sinh sống của nhiều cán bộ lãnh đạo, môi trường văn minh và an ninh bậc nhất quận Đống Đa. DT 80m² x 6 tầng, đường rộng thoáng, ô tô vòng quanh, vỉa hè sạch đẹp. Ngay cạnh vườn hoa, công viên, hồ Hoàng Cầu, đem lại không gian cực kỳ thoáng đãng Rất phù hợp để làm: Trụ sở công ty Văn phòng đại diện Phòng khám spa viện thẩm mỹ Cho thuê toàn nhà với dòng tiền ổn định Giá trị xứng tầm vị trí không có căn thứ hai. Giá chỉ 39.9 tỷ Sổ đỏ vuông đẹp, sẵn sang tên luôn Liên hệ: Hải Chiến Chuyên nhà đẹp Đống Đa Gặp và thương lượng trực tiếp với chủ nhà\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 39900000000, 'VND', 80.00, 8, 8, 6, 'Hà Nội', 'Đống Đa', NULL, 'Hoàng Cầu', NULL, NULL, 1, 0, 0, 0, 136, 0, 1, '2026-04-07 08:24:41.655435', '2026-04-07 08:24:41.655435', 9),
(47, 'Chính chủ bán đất nở hậu, ô tô tránh phố Tứ Liên - Tây Hồ. Diện tích 68m² ngõ thông. Giá chỉ 21 tỷ', 'Ngõ thông - Ô tô tránh thoải mái. - Vị trí đẹp phù hợp xây toà cho thuê apartment. - Quy hoạch ổn định, tương lai sáng với cầu Tứ Liên kết nối Tây Hồ với Đông Anh. Khu vực đang được đồng bộ hoá cơ sở hạ tầng mới. * Diện tích: 68m² - Nở hậu. * Giá chào bán: 21 tỷ. - Ngõ thông, ô tô tránh - Đỗ ngày đêm là lợi thế. - Chủ thiện chí, giá tốt cho khách giao dịch sớm. Liên hệ em Lương Vũ để được kết nối trực tiếp chủ nhà.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 21000000000, 'VND', 68.00, NULL, NULL, NULL, 'Hà Nội', 'Tây Hồ', 'Tứ Liên', 'Tứ Liên', NULL, NULL, 1, 0, 0, 1, 8781, 0, 1, '2026-04-07 08:24:41.656939', '2026-04-07 08:24:41.656939', 10),
(48, 'EM BÁN CĂN HỘ 67m2 2N2WC, TRUNG TÂM CẦU GIẤY GIÁ TỐT NHẤT THỜI ĐIỂM HIỆN TẠI', 'CĂN HIẾM 219 TRUNG KÍNH, TRUNG TÂM CẦU GIẤY Diện tích: 67m Thiết kế 2 ngủ, 2 vệ sinh cực kỳ hợp lý Nội thất: Full đẹp chỉ việc xách vali vào ở Pháp lý: Sổ đỏ sẵn sang tên nhanh Giá bán: 7.95 tỷ Thuế phí sang tên: Khách chịu Tình trạng: Bán luôn xem nhà dễ Điểm cộng nổi bật: Nằm trên trục đường Trung Kính trung tâm Cầu Giấy, kết nối mọi tuyến phố lớn: Trần Duy Hưng, Nguyễn Chí Thanh, Duy Tân, Khu dân trí cao, an ninh tuyệt đối, hàng xóm văn minh Tiện ích đồng bộ: siêu thị, trường học, khu vui chơi, café, gym ngay dưới chân toà Căn hiếm diện tích vừa giá tốt vị trí vàng, cực kỳ phù hợp cho gia đình trẻ, chuyên gia, hoặc đầu tư cho thuê Liên hệ ngay để chốt căn trong tuần hàng đẹp không có lần 2!\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 33544303, 'VND', 67.00, 2, 2, NULL, 'Hà Nội', 'Cầu Giấy', 'Yên Hòa', 'Trung Kính', NULL, NULL, 1, 0, 0, 1, 4981, 0, 1, '2026-04-07 08:24:41.658979', '2026-04-07 08:24:41.658979', 11),
(49, 'Nhà mới xây full nội thất - Phạm Văn Chiêu, Gò Vấp. DTSD 148m2, 4PN 3WC, giá chỉ 5.95 tỷ', 'Nhà mới xây full nội thất - Phạm Văn Chiêu, Gò Vấp. DTSD 148m2, 4PN 3WC. * Giá chỉ 5.95 tỷ. - Nhà mới xây 100%, nội thất cao cấp đầy đủ chỉ việc xách vali vào ở. - Kết cấu: 1 trệt, 2 lầu, sân thượng trước sau. - 4 phòng ngủ 3 toilet. - Kết cấu chuẩn hiện đại, sân trước đậu xe, ban công thoáng mát. - Hẻm 3m thông bàn cờ, cách hẻm xe tải chỉ 2 căn thuận tiện đi lại. - Khu dân cư hiện hữu, hàng xóm thân thiện, dân trí cao. - Pháp lý chuẩn: Sổ hồng riêng, sang tên công chứng trong ngày. Giá chỉ 5tỷ950 bớt lộc. Xem nhà miễn phí. Sương nhà xinh [phone_number] giúp bạn tìm không chỉ nhà, mà là tổ ấm.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5950000000, 'VND', 42.00, 4, 3, NULL, 'Hồ Chí Minh', 'Gò Vấp', NULL, 'Phạm Văn Chiêu', NULL, NULL, 1, 1, 0, 0, 4549, 0, 1, '2026-04-07 08:24:41.660486', '2026-04-07 08:24:41.660486', 12),
(50, 'Nhà 3 phòng ngủ, 2 mê, hướng Bắc, đường ô tô 4m - Đinh Công Tráng, thành phố Buôn Ma Thuột', 'Chào bạn, mình có căn nhà 2 mê tâm huyết xây dựng, đảm bảo xem thực tế còn đẹp và nét hơn trong hình. Nhà có diện tích ngang 5m10, dài 15m, thổ cư 50m2, tọa lạc tại đường Đinh Công Tráng, thành phố Buôn Ma Thuột, tỉnh Đắk Lắk. Hướng nhà là hướng Bắc, rất mát mẻ. Nhà được thiết kế hiện đại, bạn chỉ cần dọn vào ở ngay. Đã có giấy phép xây dựng và đầy đủ nội thất điện tử cao cấp như tivi, tủ lạnh, máy giặt, máy điều hòa, bếp, máy hút mùi,... Căn nhà có 3 phòng ngủ, 3 nhà vệ sinh, giếng trời thoáng đãng, phòng thờ trang nghiêm. Đường trước nhà rộng 4m xe ô tô ra vào thoải mái, có cả sân để ô tô. Giá bán: 4 tỷ 190 triệu. Liên hệ ngay Vân Kiều để xem nhà: [phone_number].\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 4190000000, 'VND', 76.50, 3, 3, 2, 'Đắk Lắk', 'Buôn Ma Thuột', NULL, 'Đinh Công Tráng', NULL, NULL, 1, 1, 0, 0, 2043, 0, 1, '2026-04-07 08:24:41.663108', '2026-04-07 08:24:41.663108', 3),
(51, 'Bán nhà phố Ngụy Như Kon Tum 54m2, 5T, MT 4,2m, 18 tỷ, Thanh Xuân [phone_number]', 'Bán nhà phố Ngụy Như Kon Tum 54m2, 5T, MT 4,2m, 18 tỷ, Thanh Xuân [phone_number] Nhà phân lô cán bộ - ngõ thông ô tô tránh kinh doanh cách phố 20m. + Thiết kế: Tầng 1 gara ô tô. Tầng 2 phòng khách, bếp thông sàn. Tầng 3,4 trở lên mỗi tầng chia 2 phòng, cầu thang giữa vệ sinh giữa. - Nhà vô cùng thông thoáng, có ô chờ thang máy. + Sổ vuông đẹp sẵn sàng giao dịch. Sổ đỏ A4. Giá: 18 tỷ. LH: Ngọc Zalo [phone_number] [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 18000000000, 'VND', 54.00, 4, NULL, 5, 'Hà Nội', 'Thanh Xuân', 'Hạ Đình', 'Ngụy Như Kon Tum', NULL, NULL, 1, 0, 0, 1, 3858, 0, 1, '2026-04-07 08:24:41.664144', '2026-04-07 08:24:41.664144', 4),
(52, 'Bán 2 ngủ 1 vệ sinh, 50m2 sử dụng - Chung cư West Bay, chung cư Ecopark - giá 2 tỷ 950 bao sổ', 'Vui lòng gọi: [phone_number]Zalo) để được tư vấn Quỹ căn bán tại Ecopark. Thông tin căn: - Vị trí: Tầng trung, thoáng, view nhìn về dự án. - Sổ lâu dài - Diện tích sử dụng: 50m2 2 phòng ngủ 1 vệ sinh, 1 ngủ nhỏ. - Giá 2 tỷ 950 bao thuế phí sang sổ.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2950000000, 'VND', 50.00, 2, 1, NULL, 'Hưng Yên', 'Văn Giang', 'Xuân Quan', 'Trúc', NULL, NULL, 0, 0, 1, 0, 6024, 0, 1, '2026-04-07 08:24:41.666141', '2026-04-07 08:24:41.666141', 5),
(53, 'Duy nhất nhà dân xây 32.5m 4.5 tầng ngõ thông, ô tô quay đầu nội thất đẹp, 6.5 tỷ', 'DUY NHẤT NHÀ DÂN XÂY 32.5M 4.5 TẦNG NGÕ THÔNG, Ô TÔ QUAY ĐẦU NỘI THẤT ĐẸP, 6.5 TỶ Vị trí vàng: Thoáng 2 mặt, ngõ thông, ô tô quay đầu cực tiện Cách Chợ 100m, Nhà Thi đấu Huyện 300m 3 bước chân sang KĐT Pháp Vân Hồng Hà Nhà đẹp chắc chắn: Chủ tự xây, nội thất xịn, vuông vắn Thiết kế đủ công năng 34 phòng ngủ cho gia đình đông thành viên Liên hệ ngay để xem nhà thực tế!\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 6500000000, 'VND', 32.60, 4, 4, 4, 'Hà Nội', 'Thanh Trì', 'Tứ Hiệp', 'Tứ Hiệp', NULL, NULL, 1, 0, 0, 1, 2759, 0, 1, '2026-04-07 08:24:41.667649', '2026-04-07 08:24:41.667649', 6);
INSERT INTO `properties_property` (`id`, `title`, `description`, `property_type`, `listing_type`, `status`, `price`, `price_unit`, `area`, `bedrooms`, `bathrooms`, `floors`, `city`, `district`, `ward`, `address`, `latitude`, `longitude`, `has_parking`, `has_pool`, `has_garden`, `is_furnished`, `views_count`, `is_featured`, `is_active`, `created_at`, `updated_at`, `owner_id`) VALUES
(54, 'CƠ HỘI VÀNG LÔ GÓC 2 MẶT TIỀN TRUNG TÂM HẢI CHÂU, ĐÀ NẴNG GẦN BIỂN, GẦN SÔNG GIÁ CHỈ 19 TỶ', '* Sở hữu ngay đất vàng trung tâm thành phố Đà Nẵng! Vị trí không thể đắc địa hơn: Lô góc 2 mặt tiền đường lớn, gần sông Hàn thơ mộng và biển Mỹ Khê nổi tiếng. Một sản phẩm hiếm có dành cho những chủ nhân đẳng cấp biết nhìn xa! * Thông tin chi tiết siêu phẩm đầu tư: - Diện tích: 163m² (ngang 6.7m x dài 25m), đất ở đô thị ODT. - Lô góc ngã tư: Mặt tiền 15m, vỉa hè 7.5m (hướng Tây Nam). Mặt bên 7.5m, vỉa hè 4.5m (hướng Đông Nam). - Khu dân cư trí thức, an ninh, sát Lottemart Cầu Tuyên Sơn Skyline Shophouse Đất Xanh. - Cách biển chỉ 3km view cực thoáng tiềm năng sinh lời cao! * Lợi ích không thể bỏ lỡ: - Vị trí chiến lược trung tâm quận Hải Châu, thuận tiện di chuyển. - Lô góc 2 mặt tiền dễ xây dựng biệt thự, khách sạn, căn hộ cao cấp. - Sổ đỏ sẵn sàng giao dịch nhanh chóng. - Giá cực tốt khu vực: chỉ 19 tỷ còn thương lượng chính chủ! Sở hữu viên kim cương thô ngay hôm nay tiềm năng tăng giá vượt trội! * Liên hệ ngay: Tuấn - chính chủ đứng bán) để xem đất và đặt cọc sớm nhất!\n\n[direct-load-vietnam]', 'other', 'rent', 'rented', 106741573, 'VND', 163.00, NULL, NULL, NULL, 'Đà Nẵng', 'Hải Châu', 'Hòa Cường Nam', 'Trần Đăng Ninh', NULL, NULL, 0, 1, 0, 1, 11029, 0, 1, '2026-04-07 08:24:41.667649', '2026-04-07 08:24:41.667649', 7),
(55, 'Bán nhà mặt phố Giáp Bát Hoàng Mai vị trí vàng kinh doanh đỉnh! Diện tích: 50,5m2 x 6 tầng', 'Bán nhà mặt phố Giáp Bát, Hoàng Mai, vị trí vàng kinh doanh đỉnh! Diện tích: 50,5m2 x 6 tầng, thang máy xịn, ô tô tránh trước nhà. Nhà mới đẹp, thiết kế hiện đại, công năng đầy đủ. Phố kinh doanh sầm uất ngày đêm, phù hợp mọi loại hình: VP, spa, showroom, cho thuê. Vị trí đắc địa, kết nối Kim Đồng Giải Phóng Trương Định cực thuận tiện. Pháp lý chuẩn, sổ đẹp, sẵn giao dịch ngay. Giá chỉ 21 tỷ căn hiếm, không có căn thứ 2!\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 21000000000, 'VND', 50.50, 5, 5, 6, 'Hà Nội', 'Hoàng Mai', 'Giáp Bát', 'Giáp Bát', NULL, NULL, 0, 0, 1, 0, 6485, 0, 1, '2026-04-07 08:24:41.670694', '2026-04-07 08:24:41.670694', 8),
(56, 'Chú Tư Bán nhà Sát Chợ Hóc Môn 3,5 tỷ SHR - Hàng hiếm', 'ĐT 4 x 10,6m xây dựng trệt + lầu. Gồm 2 phòng ngủ, 2 NVS, phồng khách, bếp ăn, có sẵn bộ sô pha xịn xò. Cách đường Trưng Nữ Vương chỉ 30m, thoáng mát, đường nhựa 7 chỗ, đang trải nhựa đi gần xong, Giá chỉ 3 tỷ 500 triệu. Làm nhựa xong kiếm giá này không còn. / Nhà mới xây hoàn công đầy đủ. Pháp lý chuẩn sẵn sàng công chứng. Liên hệ e.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 3500000000, 'VND', 42.40, 2, 2, 2, 'Hồ Chí Minh', 'Hóc Môn', 'Hóc Môn', 'Trưng Nữ Vương', NULL, NULL, 1, 0, 0, 0, 9861, 1, 1, '2026-04-07 08:24:41.672207', '2026-04-07 08:24:41.672207', 9),
(57, 'Bán căn hộ Citi Alto tại Nguyễn Thị Định, Q. 2, DT 62m2 có 2PN 2WC, tầng cao mát mẻ, Giá 1 Tỷ 730', 'Căn hộ chung cư Citi Alto ở Nguyễn Thị Định, P. Cát Lái, Q. 2, HCM đang chờ đón chủ mới. Với diện tích 62m2, 2 phòng ngủ, 2 toilet, thiết kế full nội thất siêu đẹp, căn hộ này không chỉ đáp ứng nhu cầu sống mà còn mang đến trải nghiệm sống đỉnh cao. Với phong thủy tốt và pháp lý đầy đủ, đây là cơ hội không thể bỏ lỡ cho ai đang tìm kiếm không gian sống lý tưởng. Căn hộ này rất phù hợp cho những ai yêu thích sự tiện nghi, thoải mái và hiện đại. Địa điểm tiện ích xung quanh: + Bệnh viện Lê Văn Thịnh. + Trường mầm non Quốc tế Global Ecokids - The CBD. + Siêu thị Mẹ Bầu & Em Bé Con Cưng. + Siêu thị Bách Hóa Xanh. Liên hệ ngay để biết thêm thông tin chi tiết qua [phone_number] với Hiền Thương.\n\n[direct-load-vietnam]', 'other', 'rent', 'rented', 5766666, 'VND', 62.00, 2, 2, NULL, 'Hồ Chí Minh', 'Thủ Đức', 'Cát Lái', 'Citi Alto', NULL, NULL, 1, 0, 0, 1, 2405, 0, 1, '2026-04-07 08:24:41.673688', '2026-04-07 08:24:41.673688', 10),
(58, '(NGANG 7,5M) ĐẤT MẶT TIỀN LÊ TRỌNG TẤN ĐƯỜNG 10,5M LỀ 5M-GIÁ CHỈ NHỈNH 5TY', 'ĐẤT MẶT TIỀN LÊ TRỌNG TẤN ĐƯỜNG 10,5M DT 127M2 NGANG 7,3M HƯỚNG TÂY BẮC GIÁ 5 TỶ 190 Lô đất mặt tiền đẹp trên trục Lê Trọng Tấn, đường 10,5m rộng rãi, khu dân cư đông và tiềm năng kinh doanh tốt. Diện tích 127m2, ngang 7,3m thoáng, phù hợp xây nhà ở kết hợp kinh doanh hoặc làm văn phòng. Hướng Tây Bắc, phong thuỷ hợp nhiều gia chủ. Giá bán 5 tỷ 190 triệu, thương lượng chính chủ, hỗ trợ xem đất bất kỳ lúc nào. AC cần gấp gọi trực tiếp cho em Hà theo SDT trên hoặc kết bạn zalo để em gởi thông tin ạ.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5190000000, 'VND', 127.00, NULL, NULL, NULL, 'Đà Nẵng', 'Cẩm Lệ', 'Hòa Phát', 'Lê Trọng Tấn', NULL, NULL, 1, 0, 1, 1, 2222, 0, 1, '2026-04-07 08:24:41.676226', '2026-04-07 08:24:41.676226', 11),
(59, 'Hot! Bán chung cư happy One Premier cuối đường Nguyễn Oanh - 2PN 2WC giá chỉ từ 3.67 tỷ đã có sổ', 'Hot! Chính chủ gửi bán chung cư Happy One Premier cuối đường Nguyễn Oanh - 2PN 2WC giá chỉ từ 3.67 tỷ - đã có sổ. - DT 66m2 2PN2WC, nội thất cơ bản giá 3.67 tỷ bớt lộc. Nhà đẹp ạ. - DT 68m2 2PN2WC, nhà trống giá 3.7 tỷ bớt lộc. Nhà siêu thoáng mát ạ. - DT 66m2 2PN2WC, có nội thất giá 3.79 tỷ bớt lộc. Nội thất gần như đầy đủ (chủ chỉ lấy đi tủ lạnh, máy giặt,... ) mà mới và siêu đẹp ạ. * Happy One Gò Vấp là chung cư hiện đại, mới bậc nhất TP HCM và đã có sổ. Hệ thống thiết bị điện điều khiển thông minh với sảnh chờ, Videocall, Smarhome, Hồ bơi, gym,... An ninh tuyệt đối 24/24. Trên đây em chỉ liệt kê những căn giá tốt nhất ạ. * LH E: Linh Võ E chuyên chung bán chung cư Happy One ạ, nhà gần sát bên ạ.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 3670000000, 'VND', 66.00, 2, 2, NULL, 'Hồ Chí Minh', '12', 'Thạnh Lộc', 'Nguyễn Oanh', NULL, NULL, 0, 0, 1, 0, 10958, 0, 1, '2026-04-07 08:24:41.677495', '2026-04-07 08:24:41.677495', 12),
(60, 'Căn nhà 4,4x16m, hẻm xe hơi, đẹp mê ly', 'Hạ giá 1 tỷ từ 14,9 tỷ về giá 13,9 tỷ thương lượng thêm. - Góc 2 mặt hẻm xe hơi đường Lê Văn Sỹ, P. 1, Tân Bình. (hẻm 305 Lê Văn Sỹ, nhà hàng Hương Cau, bệnh viện quốc tế ITO. - DT: 4,4x16,2m công nhận (71m2). - Kết cấu: Trệt + 3 lầu sân thượng. - Thiết kế: 6 phòng ngủ, toilet riêng từng phòng. - Giá bán 13,9 tỷ thương lượng nhanh cho khách mua thiện chí. Liên hệ: [phone_number] Khắc Cường.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 13900000000, 'VND', 71.00, NULL, NULL, NULL, 'Hồ Chí Minh', 'Tân Bình', '1', 'Lê Văn Sỹ', NULL, NULL, 0, 0, 0, 0, 1083, 0, 1, '2026-04-07 08:24:41.679627', '2026-04-07 08:24:41.679627', 3),
(61, 'Chủ người hoa bán nhà Trần Phú 3 lầu 88m2 chỉ với 3,35 tỷ sổ đầy đủ , hẻm xe hơi di chuyển các quận', '+ Tọa lạc : đường Trần Phú , phuwofmng 4 , quận 5 , Hồ Chí Minh + Diện tích : 88m2 ( 5 x 17,6 )m hoàn công đầy đủ , xây đúng diện tích + Kết cấu : 1 trệt 3 lầu , 4 phòng ngủ 4 toilet , công năng bếp sân thượng ban công riêng + Xây dựng kiên cố , bên tông cốt thép , tường dầy , chống thấm chống mốc , thiết kế hiện đại + Đường vão rộng 6m oto 2 xe di chuyển vào thoải mái , hẻm không không tóp hẻm + Nội thất cao cấp - xây dựng bê tông cốt thép kiên cố + Nhà hiện đang có hợp đồng cho thuê 20 triệu/tháng + Sổ hồng riêng chính chủ mua bán sang tên ngay không vướng pháp lý , không quy hoạch tranh chấp , bao check trực tiếp + Giá : 3 tỷ 350 làm việc trực tiếp với chính chủ có thương lượng lấy lộc mua bán nhanh chóng + Khu vực VIP quận 5 , dân cư đông đúc , khu dân trí cao , an ninh - Gần bệnh viện tim TP.HCM , chợ , xung quanh tiện ích ôm trọn , di chuyển ra trục đường Lê Hồng Phong - Trần Bình Trọng + Có ngân hàng đứng ra hỗ trợ vay 80% - Khách làm việc với chính chủ , mua bán an toàn , sổ sách chi tiết Liên hệ số em Tú 074454566 xem nhà trực tiếp với chính chủ\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 3350000000, 'VND', 88.00, 4, 4, NULL, 'Hồ Chí Minh', '5', '4', 'Khu v?c 4', NULL, NULL, 0, 1, 0, 1, 1257, 0, 1, '2026-04-07 08:24:41.680629', '2026-04-07 08:24:41.680629', 4),
(62, 'Đất ven gần Khu đô thị Sao Mai giá siêu rẻ, siêu tiềm năng', 'MB ven gần Khu đô thị Sao Mai Xuân Thịnh - Triệu Sơn - Thanh Hoá. Mặt bằng 8 lô vieu sông siêu đẹp Xuân Thịnh (cũ), nay là xã Thọ Phú, Thanh Hóa. Điểm mạnh nổi bật: Vị trí vàng: Bám đường bê tông thôn, 2 ô tô tránh nhau thoải mái. Nền đất san phẳng xây bao từng lô, pháp lý sạch, giao dịch ngay. Chỉ 200m ra đường liên xã, 3 phút tới UBND trường học KĐT Sao Mai Phố Đà. Gần công ty May, QL47C, khu tiện ích (nhà hàng, khách sạn, bể bơi, nhà xe lớn Thọ Mười Hải Định). 5 phút tới Công ty giày Da với 15.000 công nhân tiềm năng cho thuê & đầu tư cực tốt. Quy mô 8 lô full thổ cư. Diện tích: 107 - 122m2. Lô vuông nở hậu hút tài lộc. Giá chỉ từ 2xx - 3xx/lô. Bao bìa bao pháp lý công chứng nhanh gọn. Cơ hội vàng xuống cọc ngay để giữ vị trí đẹp nhất! Call e Liễu để chốt: [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 250000000, 'VND', 107.00, NULL, NULL, NULL, 'Thanh Hóa', 'Triệu Sơn', 'Thọ Dân', 'Khu v?c Thọ Dân', NULL, NULL, 1, 0, 0, 0, 10011, 0, 1, '2026-04-07 08:24:41.682142', '2026-04-07 08:24:41.682142', 5),
(63, 'Chủ gửi bán 3 lô đất P.Tân Vạn, gần trg Nguyễn Văn Trỗi P.Tân Vạn, đường xe tải, sổ riêng, TC 100%', 'Đất thổ cư 100%: 2. X tỷ. Chủ gửi bán 3 lô đất gần trường Nguyễn Văn Trỗi - P. Tân Vạn (P. Biên Hoà). 2 Lô (DT: 65m2 - ngang 5m) giá 2,3 tỷ. Lô góc (DT: 70m2) giá 2,150 tỷ. Sổ hồng riêng, thổ cư 100%. Xây dựng tự do. Đường 2 ô tô né nhau thông thoáng. Vị trí cách đường Bùi Hữu Nghĩa chỉ 300m, ngay Công An P. Biên Hoà mới. Alo em: Ngọc Vân xem đất lVCC.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2150000000, 'VND', 70.00, NULL, NULL, NULL, 'Đồng Nai', 'Biên Hòa', 'Tân Vạn', 'Bùi Hữu Nghĩa', NULL, NULL, 1, 0, 0, 1, 10167, 0, 1, '2026-04-07 08:24:41.685661', '2026-04-07 08:24:41.685661', 6),
(64, 'Bán đất đường 12 Tam Đa, Phường Long Trường, Quận 9 54.6m², giá chỉ 3 tỷ, sổ rõ ràng', 'Bán nhanh lô đất đường 12 - Tam Đa, Phường Long Trường, Quận 9, Hồ Chí Minh - Diện tích: 54.6m² (lô đất vuông vức, sạch, pháp lý rõ ràng). - Giá bán: 3 tỷ (thương lượng, bớt lộc cho khách thiện chí). - Nằm trong khu vực tiềm năng, hạ tầng hoàn thiện. - Phù hợp tài chính tầm trung đầu tư hay xây ở đều hợp lý. - Giao thông thuận tiện, kết nối nhanh ra trung tâm TP. Thủ Đức. Liên hệ: Sang để xem đất trực tiếp.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 3000000000, 'VND', 54.60, NULL, NULL, NULL, 'Hồ Chí Minh', NULL, NULL, 'Khu v?c Hồ Chí Minh', NULL, NULL, 0, 0, 0, 0, 1289, 0, 1, '2026-04-07 08:24:41.686662', '2026-04-07 08:24:41.686662', 7),
(65, 'Huỳnh Văn Bánh, Phú Nhuận - 53m2 - 5 Lầu, 3 Phòng - Hẻm trước nhà 4.5m - Giá cực tốt', '- Kết cấu: BTCT 1 trệt 3 lầu sân thượng 3PN lớn, 4WC. (có thể cải tạo. 4 PN). - Hẻm ba gác thông, gần mặt tiền, ngay kế bên Phan Đình Phùng, Duy Tân, Nguyễn Văn Trỗi. - Pháp lý sạch sẽ, hoàn công đủ, công chứng ngay. Thương lượng chính chủ:\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7600000000, 'VND', 53.00, 3, 4, 5, 'Hồ Chí Minh', 'Phú Nhuận', '15', 'Huỳnh Văn Bánh', NULL, NULL, 0, 0, 1, 0, 3148, 0, 1, '2026-04-07 08:24:41.688168', '2026-04-07 08:24:41.688168', 8),
(66, 'Cơ hội vàng: Căn hộ Blooming, tầng cao, view triệu đô - Giá tốt 5 tỷ', 'Bạn đang tìm kiếm một không gian sống đẳng cấp, tiện nghi và lãng mạn tại trung tâm Đà Nẵng? Đừng bỏ lỡ căn hộ tuyệt đẹp tại tòa nhà Blooming Tower - biểu tượng của sự sang trọng và hiện đại. Vị trí đắc địa - Giao thông thuận tiện. Blooming Tower tọa lạc tại vị trí độc tôn, ngay giao lộ của đường Võ Văn Kiệt và Ngô Quyền. Từ đây, bạn có thể dễ dàng di chuyển đến sân bay quốc tế Đà Nẵng, cầu Rồng, bãi biển Mỹ Khê và các điểm du lịch nổi tiếng khác. Vị trí này không chỉ mang lại sự thuận tiện trong di chuyển mà còn giúp bạn tận hưởng trọn vẹn nhịp sống sôi động của thành phố. Điểm nổi bật của căn hộ - Nơi an cư lý tưởng. Diện tích rộng rãi: Với 122m², căn hộ được thiết kế tối ưu hóa không gian, bao gồm 3 phòng ngủ rộng rãi và 2 phòng tắm hiện đại, mang lại sự thoải mái và riêng tư cho cả gia đình. Tầng cao, view triệu đô: Nằm ở tầng cao, căn hộ sở hữu tầm nhìn panorama tuyệt đẹp, bao quát toàn cảnh thành phố, sông Hàn thơ mộng và bán đảo Sơn Trà. Mỗi sáng thức dậy, bạn sẽ được đón bình minh tuyệt đẹp và ngắm nhìn thành phố lên đèn lung linh vào ban đêm. Đây không chỉ là một căn nhà, mà còn là một tác phẩm nghệ thuật! Nội thất cao cấp: Căn hộ được trang bị full nội thất cao cấp, từ đồ gỗ, thiết bị điện tử đến các vật dụng trang trí, tất cả đều được lựa chọn tỉ mỉ, tạo nên một không gian sống tiện nghi và sang trọng, sẵn sàng để bạn dọn vào ở ngay. Tiện ích đa dạng: Cư dân tại Blooming Tower được tận hưởng nhiều tiện ích nội khu đẳng cấp như hồ bơi, phòng gym, spa, khu vui chơi trẻ em, và an ninh 24/7, đảm bảo một cuộc sống an toàn và thư thái. Thông tin chi tiết: Diện tích: 122m². Thiết kế: 3 phòng ngủ, 2 phòng tắm. Nội thất: Full nội thất cao cấp. Giá bán: 5 tỷ . Đây là một trong những căn hộ có vị trí đẹp nhất, với tiềm năng sinh lời cao, thích hợp để ở hoặc đầu tư cho thuê. Liên hệ ngay hôm nay để nhận thêm thông tin và xem căn hộ trực tiếp!\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5000000000, 'VND', 122.00, 3, 2, NULL, 'Đà Nẵng', 'Hải Châu', 'Thuận Phước', 'Xuân Diệu', NULL, NULL, 0, 0, 0, 1, 7822, 0, 1, '2026-04-07 08:24:41.689183', '2026-04-07 08:24:41.689183', 9),
(67, 'Bán Biệt Thự Compound Khép Kín Tiêu chuẩn 5* Singapore giá 17 tỷ giảm 300 Triệu Trừ vào giá bán', 'Hotline: - Mặt tiền 7.7m - Đường 25m - Có khoảng sân vườn trước sau và 2 - 3 chỗ đỗ xe ô tô trong nhà - Vị trí: Vinhomes Ocenpark 3, Văn Lâm, Hưng Yên. + Shophouse: 115 168m2. + Biệt thự tứ lập: 151 179m2. + Biệt thự song lập: 180 250m2. + Biệt thự sân vườn: 200 464m2. + Biệt thự có bể bơi: 344 414m2 (14 căn duy nhất). * Tiện ích: The Fullton sở hữu tiêu chuẩn nghỉ dưỡng 5* đẳng cấp Singapore nơi sở hữu 100% căn nhà sở hữu sân vườn xanh mát. Với mật độ xây dựng thấp, phần lớn diện tích dành cho cây xanh và mặt nước tạo nên môi trường sống trong lành thư giãn cho cư dân nơi đây. - Công viên trung tâm rộng 1,9ha nơi cư dân có thể hòa mình với thiên nhiên. - Bể bơi điện phân rộng 1000m2 chiều dài 50m2 chuẩn thi đấu olympic. - Clubhouse đáp ứng đầy đủ các dịch vụ Gym, spa, xông hơi, phòng sinh hoạt cộng đồng, - Sân Pickleball, khu vui chơi trẻ em, đường dạo bộ cảnh quan đưa tối đa thiên nhiên vào không gian sống. - Sử dụng toàn bộ tiện ích của Vin Ocenpark 2 3 như Vincom, vịnh biển bốn mùa, Grand World, K - town, công viên hồ tạo sóng, * tiến độ thanh toán - Hỗ trợ LS 0% 24 tháng, chiết khấu thanh toán sớm. - Tiến độ đóng tiền: 7 đợt: 10% - 10%(ký HĐMB) - 10% - 10% - 10% - 45%(nhận nhà) - 5%(nhận sổ). Anh chị quan tâm đến dự án vui lòng liên hệ PKD Chủ đầu tư để nhận tài liệu và đặt lịch xem dự án. Hotline:\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 17250000000, 'VND', 115.00, 5, 5, 4, 'Hưng Yên', 'Văn Lâm', 'Tân Quang', 'The Fullton', NULL, NULL, 1, 0, 0, 1, 2352, 0, 1, '2026-04-07 08:24:41.691688', '2026-04-07 08:24:41.691688', 10),
(68, 'Phân lô - ô tô tránh - vỉa hè - đón dự án Vành Đai 4 - tương lai sáng lạng DT 52m2, 5 tầng', 'Phân lô - ô tô tránh - vỉa hè - đón dự án Vành Đai 4 - tương lai sáng lạng. Dt 52m2 5 tầng giá 15.9 tỷ. Vị trí đẹp, khu phân lô nằm ngay sau bến xe Yên Nghĩa, giáp Vành Đai 4. Trước nhà đường 6 làn ô tô tránh, vỉa hè rộng, kinh doanh. Khu vực tiềm năng tương lai vô cùng phát triển đón dự án Vành đai 4. * Nhà đang cho thuê dòng tiền 25tr/tháng. Thiết kế: - Tầng 1: Gara oto, kinh doanh, bếp. - Tầng 2,3,4: Mỗi tầng 2 phòng ngủ rộng. - Tầng 5: Thờ + sân phơi. Sổ đỏ hoa hậu, pháp lý rõ ràng. LH Ms Mức\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 15900000000, 'VND', 52.00, 6, 5, 5, 'Hà Nội', 'Hà Đông', 'Yên Nghĩa', 'Khu v?c Yên Nghĩa', NULL, NULL, 1, 1, 0, 0, 2105, 0, 1, '2026-04-07 08:24:41.692702', '2026-04-07 08:24:41.692702', 11),
(69, 'Nguyễn Đình Chiểu Q3 3.1x11.5m 4 Tầng + MCT Hẻm 8.5m Thông Giá 8.8 Tỷ TL', 'Vị trí: Hẻm rộng 8.5m, xe hơi tránh nhau thoải mái, thông ra Võ Văn Tần Điện Biên Phủ, trung tâm Quận 3. Khu dân trí cao, an ninh, xung quanh đầy đủ tiện ích: siêu thị, trường học, bệnh viện, nhà hàng, quán cà phê sang trọng. Diện Tích 3.1*11.5, vuông, không lỗi phong thủy Kết cấu: 1 trệt, 3 lầu, sân thượng + MCT, nhà kiên cố, thiết kế hiện đại, ánh sáng tự nhiên, dọn vào ở ngay. Ưu điểm nổi bật: Hẻm cực đẹp, thoáng, khu VIP Quận 3 hiếm nhà bán. Phù hợp vừa ở vừa cho thuê, làm văn phòng, spa, căn hộ dịch vụ. Sổ hồng chính chủ, công chứng trong ngày. Giá bán: 8.8 tỷ\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 8800000000, 'VND', 35.00, NULL, NULL, 5, 'Hồ Chí Minh', '3', '3', 'Khu v?c 3', NULL, NULL, 1, 0, 0, 1, 5037, 0, 1, '2026-04-07 08:24:41.695136', '2026-04-07 08:24:41.695136', 12),
(70, 'Bán CC Ruby City CT3, 4,5 tỷ, 70m2, Long Biên, Hà Nội', 'Nhanh tay sở hữu căn hộ Ruby City CT3 nằm tại Đường Phúc Lợi, Phường Giang Biên, Long Biên, Hà Nội. - Giá chỉ 4,5 tỷ VND cho diện tích 70m2. - Thiết kế hiện đại với 2-3 phòng ngủ, phục vụ nhu cầu đa dạng của gia đình. - Khuôn viên xanh mát, tạo không gian sống thoải mái và gần gũi với thiên nhiên. - Phong thủy tốt, mang lại tài lộc và sức khỏe cho gia chủ. - Tiện ích nội khu đa dạng như hồ bơi, sân tennis, khu vui chơi trẻ em, và quán cafe. Khu vực xung quanh - Gần siêu thị Hapromart Trâu Quỳ, siêu thị Hằng Thuần. - Dễ dàng tiếp cận các bệnh viện, sân golf Long Biên, và trung tâm thương mại lớn như Aeon Mall. Giới thiệu dự án - Chung cư Ruby City CT3 được đầu tư bởi Công ty CP Đầu tư Phát triển Nhà Thăng Long - Việt Nam. - Dự án bao gồm 2 đơn nguyên A và B, với tổng số 1.120 căn hộ, thiết kế 22 tầng nổi và 3 tầng hầm. - Các tiện ích như bảo vệ 24/24, khu vui chơi ngoài trời và vườn nướng BBQ. Liên hệ để biết thêm thông tin chi tiết qua số điện thoại hoặc gặp Trịnh Hiếu.\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 21226415, 'VND', 70.00, NULL, NULL, NULL, 'Hà Nội', 'Long Biên', 'Giang Biên', 'Phúc Lợi', NULL, NULL, 1, 0, 1, 0, 9445, 0, 1, '2026-04-07 08:24:41.696643', '2026-04-07 08:24:41.696643', 3),
(71, 'Bán đất Yên Viên - Hà Huy Tập - 160m2', 'Đất nền chính chủ sổ đỏ - 160m2. Thuận tiện đi lại, gần chợ, đối diện ga Yên. Viên Quốc Tế, đất vuông vắn đẹp đẽ thoáng, dân trí hiền lành. Mua để ở hay làm gì cũng tuyệt vời vì vía chủ nhà tốt tính thoải mái. Liên hệ chính chủ: Linh\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 7500000000, 'VND', 160.00, NULL, NULL, NULL, 'Hà Nội', 'Gia Lâm', 'Yên Viên', 'Hà Huy Tập', NULL, NULL, 0, 0, 1, 0, 8021, 0, 1, '2026-04-07 08:24:41.697648', '2026-04-07 08:24:41.697648', 4),
(72, 'Bán nhà riêng Văn Quán 40m, 5T giá chỉ 7,4 tỷ', 'Bán nhà riêng Văn Quán 50m, 5T giá chỉ 7,4 tỷ - Gần các trường học liên cấp - Gần các bệnh viện lớn của quốc gia - Giao thông thuận tiện - Tiện ích xung quanh đầy đủ - Gần siêu thị và các chợ dân sinh + Sổ đỏ chính chủ, sẵn sàng giao dịch - Liên hệ Ms Phương: ( để được hỗ trợ xem nhà)\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7400000000, 'VND', 40.00, NULL, NULL, 5, 'Hà Nội', 'Hà Đông', 'Văn Quán', '19/5', NULL, NULL, 1, 0, 0, 0, 8752, 0, 1, '2026-04-07 08:24:41.699905', '2026-04-07 08:24:41.699905', 5),
(73, 'Quá rẻ - bán khách sạn 2 mặt tiền Nguyễn Biểu cách biển 200m - giá chỉ 14 tỷ', 'Quá rẻ - bán khách sạn 2 mặt tiền Nguyễn Biểu cách biển 200m - giá chỉ 14 tỷ. Thông tin chi tiết: Diện tích đất: 103 m² (ngang 4,1 m). Tổng diện tích sàn xây dựng: 468 m². Kết cấu khách sạn 12 phòng, xây dựng kiên cố. Mặt tiền đường nhựa rộng 13 m. Hướng: Chính Nam mát mẻ, phong thủy tốt. Pháp lý: Sổ hồng riêng, hoàn công đầy đủ. Vị trí & tiềm năng khai thác: Mặt tiền đường Nguyễn Biểu khu vực tập trung khách sạn, nhà hàng. Cách biển chỉ 200 m, sát bên tòa nhà Scenia Bay. Khu dân cư đông đúc, lượng khách du lịch ổn định quanh năm. Phù hợp tiếp tục khai thác khách sạn hoặc nâng cấp mô hình lưu trú. Hiện trạng khai thác: Đang cho thuê tự vận hành: 20 triệu/tháng. Giá bán: 14 tỷ. (Thương lượng thiện chí cho khách mua nhanh). Liên hệ: Mr. Lam [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 14000000000, 'VND', 103.00, NULL, NULL, NULL, 'Khánh Hòa', 'Nha Trang', 'Vĩnh Hải', 'Nguyễn Biểu', NULL, NULL, 0, 0, 0, 1, 9127, 0, 1, '2026-04-07 08:24:41.700911', '2026-04-07 08:24:41.700911', 6),
(74, 'Bán nhà cấp 4 hẻm xe hơi Chu Văn An P12 Bình Thạnh khu được xây hầm 7 tầng, DT 4.2x23m, giá 13.5 tỷ', 'BÁN NHÀ CẤP 4 HẺM XE HƠI THÔNG THOÁNG GẦN HỌC VIỆN CÁN BỘ, CHU VĂN AN, BÌNH THẠNH Vị trí: Đường Chu Văn An, Phường 12, Quận Bình Thạnh Hẻm xe hơi rộng rãi thông nhiều hướng, khu dân trí cao, an ninh yên tĩnh Diện tích: 4.2 x 23m vuông vức, phong thủy đẹp Khu vực được phép xây hầm 7 tầng Tiềm năng khai thác cực cao: Thích hợp xây văn phòng công ty, căn hộ dịch vụ cao cấp, hoặc vừa ở vừa kinh doanh Dự kiến quy mô: 21 phòng lớn + 1 mặt bằng kinh doanh Doanh thu khai thác tối thiểu 100 triệu/tháng Tiện ích xung quanh: Cách Học viện Cán Bộ TP.HCM, Co.opmart Chu Văn An chỉ vài phút Gần chợ, trường học, trung tâm thương mại, thuận tiện di chuyển Phạm Văn Đồng sân bay Tân Sơn Nhất quận 1 Giá bán: 13.5 tỷ (thương lượng chính chủ) Liên hệ Dương ngay để xem nhà và thương lượng trực tiếp vị trí vàng hiếm có tại trung tâm Bình Thạnh!\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 13500000000, 'VND', 100.00, NULL, NULL, NULL, 'Hồ Chí Minh', 'Bình Thạnh', '12', 'Chu Văn An', NULL, NULL, 0, 0, 0, 1, 2058, 1, 1, '2026-04-07 08:24:41.702420', '2026-04-07 08:24:41.702420', 7),
(75, 'Bán nhà Ngọc Lâm, LB quá hiếm 2 mặt ngõ 55m2 2 tầng giá tốt chỉ 8tỷ nhỉnh, khu trung tâm gần cầu', '- Vị trí quá đẹp, cách mặt phố Ngọc Lâm vài bước đi bộ, cách cầu Chương Dương chỉ khoảng 200m. Khu trung tâm tiện ích thứ gì cũng có, hàng quán phố xá tấp nập, sang phố cổ rất gần. Nhà dân xây 2 tầng khách mua về có thể sửa cải tạo lên tầng. Sổ đỏ chính chủ, giao dịch ngay.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 8400000000, 'VND', 55.00, NULL, NULL, 2, 'Hà Nội', 'Long Biên', 'Ngọc Lâm', 'Ngọc Lâm', NULL, NULL, 1, 0, 1, 0, 5974, 0, 1, '2026-04-07 08:24:41.703456', '2026-04-07 08:24:41.703456', 8),
(76, 'Bán nhà xây mới 7 tầng full nội thất gara thang máy ngay trung tâm Vinhomes Long Biên giá 13.5 tỷ', 'Bán nhà Phúc Đồng xây 7 tầng, thang máy, mới cứng full nội thất chỉ việc ở. Thiết kế 7 tầng. - Tầng 1: Gara ô tô + thông sàn. - Tầng 2,3,4: Mỗi phòng 1 ngủ 1 wc. - Tầng 5: Phòng khách. - Tầng 6: Phòng ăn + Bếp. - Tầng 7: Phòng thờ, sân BBQ. Giá bán chỉ 13.5 tỷ thương lượng trực tiếp. Lh:\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 13500000000, 'VND', 42.00, 3, 3, 7, 'Hà Nội', 'Long Biên', 'Phúc Đồng', 'Nguyễn Lam', NULL, NULL, 0, 0, 0, 1, 10358, 0, 1, '2026-04-07 08:24:41.705463', '2026-04-07 08:24:41.705463', 9),
(77, 'Bán Shop 11 tỷ 200 triệu - 64m2 tại Vinhomes Grand Park. tp. Hồ Chí Minh', 'Bán Shop Vinhomes Grand Park, tp. Hồ Chí Minh - Shop Chân đế căn hộ. - Diện tích: 64m² (thông thuỷ sử dụng thực tế). - Bán 11 tỷ 200 triệu. - Giá mua 2020 là 12 tỷ (chủ cần tiền bán gấp). - Vị trí: Mặt sảnh cư dân, lối đi ra vào của hơn 1000 cư dân tại toà nhà. Nơi có hơn 10.000 giao thông lưu lượng qua lại mỗi ngày. Nhà thuốc, tiệm nails, spa mini, trà sữa, chè, phòng vé máy bay. Nhà hàng, ăn uống - THời hạn sở hữu shop là bao lâu? Shop Vinhomes Grand Park sở hữu sổ hồng lâu dài. SHOP ĐÃ CÓ SỔ HỒNG Anh Chị quan tâm mua Shop Vinhomes Grand Park gọi em Dung: ạ. Em Dung: chuyên Shop Vinhomes Grand Park, nắm giỏ hàng full 99% tại khu đô thị Vinhomes với nhiều diện tích khác nhau, từng căn, từng đặc điểm vị trí của căn. Với kinh nghiệm 03 năm làm thị trường Shop sẽ hỗ trợ tìm căn phù hợp, tư vấn trung thực chính xác nhất đến quý Cô Chú, Anh Chị ạ.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 11500000000, 'VND', 64.00, NULL, NULL, 1, 'Hồ Chí Minh', NULL, NULL, 'Vinhomes Grand Park', NULL, NULL, 1, 0, 0, 1, 194, 0, 1, '2026-04-07 08:24:41.706463', '2026-04-07 08:24:41.706463', 10),
(78, 'Nhà cực đẹp trong khu nhà cao 5 tầng hiện đại sang trọng - tặng full nội thất cao cấp chỉ 6.3 t', 'NHÀ CỰC ĐẸP TRONG KHU NHÀ CAO 5 TẦNG HIỆN ĐẠI SANG TRỌNG - TẶNG FULL NỘI THẤT CAO CẤP CHỈ 6.3 TỶ + Vị trí Trần Thị Trọng (Cống Lở) Phường 15 Quận Tân Bình + Nhà cực đẹp ngất ngây, thiết kế hiện đại hài hoà, trang trí nội thất cao cấp. + Kết cấu 1 trệt 1 lửng 2 lầu sân thượng, 3PN master cực rộng, 1 phòng kho trên sân thượng., + Tặng toàn bộ nội thất cao cấp Sổ vuông vức, ngang 4.4m dài vừa đẹp\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 6300000000, 'VND', 37.00, 3, 3, NULL, 'Hồ Chí Minh', 'Tân Bình', '15', 'Khu v?c 15', NULL, NULL, 0, 0, 0, 1, 8565, 0, 1, '2026-04-07 08:24:41.710027', '2026-04-07 08:24:41.710027', 11),
(79, 'Bán gấp nhà Tây Thạnh, Tân Phú, 32m2, giá 3.8 tỷ', '+ Kết cấu BTCT 2T, 2PN, 2WC, đầy đủ công năng! + DT 4x8m, hẻm thẳng 3m. + Khu dân cư yên tĩnh, gần chợ, trường học các cấp, ra siêu thị Aeon Mall 5 phút. + Pháp lý chuẩn, sổ mới, công chứng ngay!\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 3800000000, 'VND', 32.00, 2, 2, NULL, 'Hồ Chí Minh', 'Tân Phú', 'Tây Thạnh', 'Tây Thạnh', NULL, NULL, 0, 0, 0, 1, 4658, 0, 1, '2026-04-07 08:24:41.711549', '2026-04-07 08:24:41.711549', 12),
(80, 'Bán Nhà HXH 14 CHDV 4tầng Nguyễn gia Trí ( D2 ) Bình Thạnh . 4 X19. 21ty. Doanh Thu 100tr', 'Bán tòa nhà hẻm 69/ D2 14 CHDV 4 Tầng (Nguyễn Gia Trí )Bình Thạnh - Diện Tích 4 x 19m - DTCN ; 80m -Kết cấu ;1 trệt 4 tầng 14 CHDV full nội Thất đang khai thác 100tr/th đường trước nhà 8m hẻm thông hẻm kinh doanh khu vực chuyên CHDV giá 21ty có Thương Lượng -Pháp lý sổ hồng chính chủ Anh Chị quan tâm sản phẩm vui lòng gọi ngay em Phượng để biết thêm thông tin Để được xem nhà và mua giá tốt -Chuyên : Ms PhượngNhận ký gửi và Review nhà đất các Quận TP.HCM. Làm hồ sơ nhà đất(giấy tờ, hoàn công, xin phép xây dựng...) Tư vấn và giới thiệu bank vay với lãi suất tốt nhất thị trường.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 21000000000, 'VND', 80.00, 14, 14, 4, 'Hồ Chí Minh', 'Bình Thạnh', '25', 'Nguyễn Gia Trí', NULL, NULL, 0, 0, 1, 1, 1761, 1, 1, '2026-04-07 08:24:41.712077', '2026-04-07 08:24:41.712077', 3),
(81, 'Bán gấp trong tuần - nhà đẹp - 4 lầu - Hậu Giang đoạn sung', 'Bán nhà mới đẹp, hẻm an ninh ngay khu trung tâm đường Hậu Giang P. 5, Q. 6. - Diện tích: 3.5m x 11.5m. - Kết cấu: Trệt, lửng, 2 lầu sân thượng BTCT (3 phòng, 3 toilet). - Tiện ích: Gần Chợ Lớn, gần siêu thị Hậu Giang, ngay khu trung tâm đông đúc nhất hội tụ đầy đủ tiện nghi. - Hẻm 4m thông ra Bửu Đình, Phan Văn Khỏe. - Giá giảm mạnh 500 triệu còn 6.1 tỷ thương lượng. Liên hệ: [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 6100000000, 'VND', 50.00, 3, 3, NULL, 'Hồ Chí Minh', '6', '2', 'Hậu Giang', NULL, NULL, 1, 1, 1, 1, 4462, 0, 1, '2026-04-07 08:24:41.714494', '2026-04-07 08:24:41.714494', 4),
(82, 'Bán nhà dân xây đẹp lô góc ngõ ô tô kinh doanh ngõ 575 kim Mã DT 31 m2 6 tầng MT 4,8 m giá 14,4 tỷ', 'Vị trí căn nhà đẹp nằm mặt ngõ chính lô góc ô tô đỗ cửa kinh doanh giao thông tiện lợi rất gần với phố chính Kim Mã. Sổ đỏ vuông đẹp không vướng quy hoạch phong thuỷ hài hoà tốt.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 14400000000, 'VND', 31.00, 6, 6, 6, 'Hà Nội', 'Ba Đình', NULL, 'Kim Mã', NULL, NULL, 1, 1, 1, 0, 7305, 1, 1, '2026-04-07 08:24:41.716645', '2026-04-07 08:24:41.716645', 5),
(83, 'SIÊU PHẨM! Hương Lộ 2, Bình Tân, gần khu Aeon Mall Tên Lửa, 4x17m, 5 tầng Full Nội thất- 8.2 Tỷ', 'SIÊU PHẨM! ĐẸP KHÔNG TÌ VẾT - HƯƠNG LỘ 2- BÌNH TÂN Diện tích: 4x16.5(66m2). 1 trệt 1 lửng 2 lầu sân thượng( 5 tầng). 4 phòng ngủ, 5 toilet, FULL nội thất. Nhà mới xây, pháp lý chuẩn, hoàn công đầy đủ. Khu đồng bộ cao tầng, an ninh, đường 6m oto ngủ trong nhà. Vị trí: Hương Lộ 2 + Mã Lò, gần bệnh viện Quận(cũ), khu Aoen Mall Tên Lửa... Hướng: Tây- phù hợp gia chủ hợp mệnh Tây Tứ Trạch. Giá bán: 8.2 Tỷ thương lượng #nhamoi #nhadep #nhadepfullnoithat #nhabinhtan #nhadepbinhtane\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 8200000000, 'VND', 66.00, 5, 5, 5, 'Hồ Chí Minh', 'Bình Tân', 'Bình Trị Đông A', 'Hương lộ 2', NULL, NULL, 0, 0, 0, 1, 8615, 0, 1, '2026-04-07 08:24:41.717676', '2026-04-07 08:24:41.717676', 6),
(84, 'Cần bán! Khương Hạ gần hồ Đầm Hồng siêu thoáng mát, 42m², nhà đẹp hơn tình đầu', 'Chủ nhà: Dễ mến, nói chuyện một câu là muốn xuống cọc ngay. Tiện ích: Vài phút ra Ngã Tư Sở, gần Royal City, xung quanh đầy đủ trường chợ siêu thị. Thông số nhà: 4 tầng, 4PN, 3WC, kiến trúc tân cổ điển sang trọng. Nội thất full, khách chỉ việc xách vali vào ở. Diện tích 42m², giá 6,x tỷ (x tiểu học, thương lượng nhanh gọn 3). Pháp lý: Sổ đỏ trao tay, giao dịch trong ngày nếu ưng. Saler: Em Hạnh Thanh Xuân, nhiệt tình hiếu khách gọi là có lô là tới. Liên hệ ngay: [phone_number] em Hạnh Thanh Xuân tư vấn & dẫn đi xem nhà free. Đêm khách muốn đi xem cũng chiều luôn, chỉ cần gọi hoặc nhắn Zalo em.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 6350000000, 'VND', 42.00, 4, 3, 4, 'Hà Nội', 'Thanh Xuân', 'Khương Đình', 'Khương Hạ', NULL, NULL, 1, 0, 0, 0, 11196, 1, 1, '2026-04-07 08:24:41.719197', '2026-04-07 08:24:41.719197', 7),
(85, 'Nhà bán MT Thương Hiệu Cao Thắng, Quận 10, 8x17m - 6 Tầng - Hợp đồng thuê: 160 triệu, giá 58 tỷ', 'Định cư Mỹ nay bán gấp nhà mặt tiền Cao Thắng, Phường 12 - Quận 10 - Góc ngã tư đường 3 Tháng 2, vị trí đẹp, tiện đi lại vào trung tâm quận 1,3 - Diện tích: 8x17m - Kết cấu: 6 Tầng - Thang máy - HĐT: 160 triệu/mỗi tháng - Giá bán: 58 tỷ Xem nhà trực tiếp: [phone_number] Trúc Phương 24/7\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 58000000000, 'VND', 137.00, NULL, NULL, NULL, 'Hồ Chí Minh', '10', '12', 'Cao Thắng', NULL, NULL, 0, 0, 0, 1, 9926, 0, 1, '2026-04-07 08:24:41.720753', '2026-04-07 08:24:41.720753', 8),
(86, 'Bán Nhà Siêu Vị Trí Mặt tiền Nguyễn Tri Phương Quận 10 - (4,5x30m) - 5 Tầng - HĐT: 170TR/TH - 40 Tỷ', 'Bán nhà siêu vị trí mặt tiền đường Nguyễn Tri Phương. Phường 4. Quận 10 - Diện tích: 4,5 x 30m - Kết cấu: 5 Tầng - Vị trí đẹp, tuyến đường thương hiệu - Đối diện Đại Học Kinh Tế - Khu vực tập trung nhiều ngành nghề, đông đúc, sầm uất ngày đêm - Phù hợp kinh doanh hoặc cho thuê - Hợp đồng thuê: 170TR/Tháng - Giá: 40 Tỷ - Liên hệ: [phone_number] Trinh - Cam kết thông tin đúng. Người thật việc thật 100%\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 40000000000, 'VND', 157.50, NULL, NULL, NULL, 'Hồ Chí Minh', '10', '4', 'Nguyễn Tri Phương', NULL, NULL, 0, 0, 0, 0, 4393, 1, 1, '2026-04-07 08:24:41.722772', '2026-04-07 08:24:41.722772', 9),
(87, 'Cơ hội vàng! MT Bùi Đình Túy, ngang to 5,3m x 18m, 5 tầng kiên cố, hướng mát Đông Nam, chỉ 22 tỷ', '* Cam kết thông tin thật, nhà thật, khô làm mất thời gian quý anh chị. Gọi ngay: [phone_number]zalo/call) Ngọc Linh. Cần bán nhà mặt tiền Bùi Đình Túy, P12, Bình Thạnh. - Diện tích: 5,3 x 18m. - Khuôn đất: Vuông vức, không lỗi phong thuỷ. - Hiện trạng: 5 tầng - Lửng 4 tầng sân thượng kiên cố. - Pháp lý: Sổ hồng chính chủ, sang tên ngay. - Vị trí: Kinh doanh sầm uất, khu ăn uống Bùi Đình Túy, khu an ninh, tấp nập. 50m ra tới Nguyễn Xí, tiện ích điện máy xanh, cửa hàng tiện lợi, bách hoa xanh, ủy ban phường,... Chỉ 30m. - Giá: Chỉ 22 tỷ Thương lượng. Gọi ngay: [phone_number]zalo/call) Ngọc Linh.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 22000000000, 'VND', 95.40, NULL, NULL, NULL, 'Hồ Chí Minh', 'Bình Thạnh', '12', 'Bùi Đình Túy', NULL, NULL, 1, 0, 0, 0, 2829, 0, 1, '2026-04-07 08:24:41.723769', '2026-04-07 08:24:41.723769', 10),
(88, 'Vũ Tông Phan - Thanh Xuân - 36m2 - Nhà đẹp như mới - Ô tô vào nhà - 9.x tỷ', 'Vũ Tông Phan - Thanh Xuân - 36m2 - Nhà đẹp như mới - Ô tô vào nhà - 9.x tỷ. Mô tả: - Căn nhà ở ngõ Vũ Tông Phan có diện tích 36m2. Nhà đẹp như mới, full nội thất, thiết kế: Nhà 5 tầng gồm 6PN, thiết kế mỗi tầng 2P, vệ sinh giữa. Tầng 1: Phòng khách, bếp, vệ sinh. Tầng 2,3,4: Mỗi tầng 2PN vệ sinh giữa. Tầng 5: Phòng thờ, sân phơi. - Giao thông thuận tiện kết nối Khương Đình, Kim Giang, Nguyễn Trãi. Di chuyển ra Ngã Tư Sở chỉ mất 2p đi xe. - Ngõ thông thoáng, kinh doanh tốt. Gần chợ, siêu thị, trường học các cấp. Tiện ích xung quanh đầy đủ. - Giả chỉ nhỉnh 9 tỷ. Sổ đỏ chính chủ, sẵn sàng giao dịch. Mọi chi tiết liên hệ em Nam nhà đẹp SĐT:\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 9300000000, 'VND', 36.00, 6, 4, 5, 'Hà Nội', 'Thanh Xuân', 'Khương Đình', 'Vũ Tông Phan', NULL, NULL, 1, 0, 0, 1, 4821, 0, 1, '2026-04-07 08:24:41.726078', '2026-04-07 08:24:41.726078', 11),
(89, 'Nhà đẹp Khương Hạ, gara ô tô, thang máy, 6 tầng, nhỉnh 14 tỷ.', '- Nhà dân xây kiên cố, thiết kế sang trọng, nội thất xịn. - Gara xe 7 chỗ, thang máy chạy mượt mà. - Khu vực trung tâm rất thuận lợi đi chuyển Trường Chinh, Tây Sơn, Nguyễn Trãi, Nguyễn Xiển,... - Sổ đỏ vuông đẹp, sàn giao dịch. - Liên hệ xem nhà miễn phí Em Thu 88: [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 14700000000, 'VND', 48.00, NULL, NULL, NULL, 'Hà Nội', 'Thanh Xuân', 'Khương Đình', 'Khương Hạ', NULL, NULL, 0, 0, 1, 0, 8631, 0, 1, '2026-04-07 08:24:41.727073', '2026-04-07 08:24:41.727073', 12),
(90, 'Căn góc siêu Hot N23-1 | phân khu Sky Light Hoàng Huy New City diện tích 76m2, căn góc', 'Căn góc siêu Hot N23-1 | Phân khu Sky Light Hoàng Huy New City. Diện tích 76m2, căn góc 3 mặt tiền, xây dựng 5 tầng. Phân khu đón đầu dự án, phân khu mở tiềm năng tăng giá mạnh. Kết nối trực tiếp 2 trục nội khu lớn nhất 30m & 25m. Vị trí cực đẹp phù hợp kinh doanh, cho thuê, khai thác dòng tiền. Liền kề dưới chân cao tầng lưu lượng cư dân và khách vãng lai cao. Gói quà & chiết khấu đặc biệt lên tới 865 triệu. Thanh toán theo tiến độ. Chiết khấu 6%. Ngân hàng bảo lãnh tiến độ chỉ 1%. Giá cuối chỉ hơn 15 tỷ. Liên hệ giữ căn góc đẹp N23-1: Trang [phone_number]Zalo/Call).\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 15000000000, 'VND', 76.00, 5, 5, NULL, 'Hải Phòng', 'Thủy Nguyên', NULL, 'Hoàng Huy New City', NULL, NULL, 0, 0, 0, 0, 3633, 0, 1, '2026-04-07 08:24:41.728578', '2026-04-07 08:24:41.728578', 3),
(91, 'Bán căn hộ Full House 2PN giá rẻ - khu Tên Lửa', 'Góc bán căn hộ Full House. Vị trí số 1, đường 34, Bình Trị Đông B, Bình Tân. - Căn 2pn - 2wc. - Diện tích 75m2. Nội thất nhà trống, khách mua về sau sẽ setup theo ý thích của mình. Tiện ích xung quanh chung cư gồm có công viên, chợ, trường học đầy đủ.. Giá bán 2.450 tỷ. Pháp lý: HĐMB (công chứng sang tên). Liên hệ xem nhà ngay.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2450000000, 'VND', 75.00, 2, 2, NULL, 'Hồ Chí Minh', 'Bình Tân', 'Bình Trị Đông B', 'Full House', NULL, NULL, 0, 0, 0, 1, 9909, 1, 1, '2026-04-07 08:24:41.729775', '2026-04-07 08:24:41.729775', 4),
(92, 'Bán nhà HXT Lạc Long Quân P. 9 Tân Bình 80m2 4.7m x 17m giá 16.5tỷ TL', 'Bán nhà hẻm xe tải tránh Lạc Long Quân, phường 9, Tân Bình, giáp quận 10, 80m² 5 tầng BTCT, vừa ở vừa kinh doanh, giá 16.5 tỷ TL. Thông số nhà. Diện tích công nhận: 80m². Kích thước: Ngang 4.7m, dài 17m. Kết cấu: 1 trệt, 3 lầu, sân thượng (BTCT). Công năng: Phòng khách rộng, bếp riêng, 5 phòng ngủ, 6 WC, phòng thờ, phòng kho, 3 sân thượng trước & sau. Mặt bằng tầng trệt rất lớn, kinh doanh cực tốt. Vị trí: Đường Lạc Long Quân, phường 9, Tân Bình. Hẻm quy hoạch 8m, xe tải tránh nhau. Chỉ 50m ra mặt tiền Lạc Long Quân, giáp quận 10, kết nối nhanh Âu Cơ, Lý Thường Kiệt, CMT8. Mô tả kết cấu hiện trạng. Nhà xây BTCT kiên cố, kết cấu cao tầng đồng bộ. Phù hợp: Ở gia đình đông người, mở văn phòng, spa, trung tâm đào tạo, CHDV. Vừa ở vừa kinh doanh dòng tiền. Ngân hàng hỗ trợ vay gần 10 tỷ. Phân tích thị trường & tiềm năng. Khu Lạc Long Quân, giáp Q10 là trục hiếm nhà lớn, hẻm rộng. Sản phẩm 80m² 5 tầng hẻm 8m gần như không có hàng so sánh trực tiếp. Giá 16.5 tỷ đang thấp hơn mặt bằng khu vực cùng phân khúc. Phù hợp mua giữ tài sản, khai thác lâu dài, tăng giá bền. Pháp lý: Sổ hồng riêng. Hoàn công đầy đủ. Đang vay bank hơn 1 tỷ, hỗ trợ giải chấp nhanh. Công chứng ngay. Liên hệ ngay: Mạnh Nhà Phố SG. BĐS HCM Giá Tốt. Uy tín. Chuyên nghiệp. Tốc độ. Hiệu quả. Xem nhà miễn phí. Hỗ trợ tư vấn đến khi ưng ý.\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 16500000000, 'VND', 80.00, 5, 6, 5, 'Hồ Chí Minh', 'Tân Bình', '9', 'Lạc Long Quân', NULL, NULL, 1, 1, 1, 1, 201, 0, 1, '2026-04-07 08:24:41.731876', '2026-04-07 08:24:41.731876', 5),
(93, 'BÁN NHÀ HẺM 5M ĐƯỜNG THÍCH QUẢNG ĐỨC- LIỀN KỀ KHU DỰ ÁN SUNGROUP', 'BÁN NHÀ HẺM 5M ĐƯỜNG THÍCH QUẢNG ĐỨC- LIỀN KỀ KHU DỰ ÁN SUNGROUP Diện tích: 55.3m (5.05x11) Hướng: Bắc Thiết kế: nhà 1 trệt 1 lửng. CNSD 3pn 2wc 1pt/sinh hoạt chung. Đường hiện trạng 5.5m qh7m Tiện ích trong bán kính 500m:Trường học, công viên, sông Tiềm năng: nằm gần KĐT Sungroup Pháp lý Sổ hồng hoàn công Giá: 5tỷ5 TL nhẹ Thuế phí: bên bán\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5500000000, 'VND', 55.30, 3, NULL, NULL, 'Khánh Hòa', 'Nha Trang', 'Phước Hải', 'Thích Quảng Đức', NULL, NULL, 1, 0, 0, 1, 9833, 0, 1, '2026-04-07 08:24:41.734299', '2026-04-07 08:24:41.734299', 6),
(94, 'Đất nền dự án Hội An Green Village, 15 triệu / m2, 150 m2 tại Điện Nam Đông, Điện Bàn, Quảng Nam', 'Hội An Green Village tại Điện Nam Đông, Điện Bàn, Quảng Nam là một dự án đất nền lý tưởng cho những ai đang tìm kiếm một vị trí đắc địa để đầu tư hoặc xây dựng tổ ấm. Với diện tích 150m2, đây là cơ hội hiếm có để sở hữu một lô đất với giá ưu đãi. - Diện tích: 150m2. - Giá: 15 triệu / m2. - Pháp lý: Pháp lý đầy đủ. - Chiều ngang mặt tiền: 6m. - Chiều rộng ngõ trước: 17.5m. Điểm nhấn: - Ngõ vào rộng, thuận tiện cho ô tô di chuyển. - Mặt tiền rộng rãi, phù hợp cho các hoạt động kinh doanh. - Pháp lý đầy đủ, đảm bảo tính minh bạch và an toàn cho giao dịch. Liên hệ để biết thêm chi tiết: Phạm Văn Hiếu [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 2250000000, 'VND', 150.00, NULL, NULL, NULL, 'Quảng Nam', 'Điện Bàn', NULL, 'Hội An Green Village', NULL, NULL, 1, 0, 1, 1, 1819, 0, 1, '2026-04-07 08:24:41.735819', '2026-04-07 08:24:41.735819', 7),
(95, 'Hiếm! KDC Tân Quy Đông Q7, 6x15m,5 tầng, thang máy xịn sò, nhỉnh 22 tỷ', 'Bán nhà 5 tầng mặt tiền đường số khu dân cư Tân Quy Đông, xe hơi ngủ trong nhà, có thang máy xịn sò Vị trí: khu dân cư Tân Quy Đông quận 7, khu cực kỳ hiếm nhà bán, giáp Nguyễn Thị Thập, 5 phút ra Lotte mart Kết cấu: 6x15m, 5 tầng, có thang máy, nội thất nhập khẩu đẹp Nhà được kĩ sư nước ngoài thiết kế và xây dựng nên rất chắc chắn Chính chủ 1 đời, chưa qua mua bán đầu tư Pháp lý chuẩn, sổ hồng riêng, công chứng ngay MIỄN TIP MG, TRUNG GIAN\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 22300000000, 'VND', 100.00, NULL, NULL, NULL, 'Hồ Chí Minh', '7', 'Tân Phong', '54', NULL, NULL, 1, 0, 0, 1, 8008, 0, 1, '2026-04-07 08:24:41.738372', '2026-04-07 08:24:41.738372', 8),
(96, 'Đất đường Hoà Phú 11 . ( gò nảy 8 cũ ) - Diện tích 100m2', 'Đất đường Hoà Phú 11 . ( gò nảy 8 cũ ) - Diện tích 100m2 - Hướng Đông Nam. - Giá 5ty190tl. Ít\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 5190000000, 'VND', 100.00, NULL, NULL, NULL, 'Đà Nẵng', 'Liên Chiểu', 'Hòa Minh', 'Khu v?c Hòa Minh', NULL, NULL, 1, 1, 0, 1, 9087, 0, 1, '2026-04-07 08:24:41.739385', '2026-04-07 08:24:41.739385', 9),
(97, 'Bán nhà hẻm kinh doanh - khu ẩm thực Cư Xá Phú Lâm B - nhỉnh 4 tỷ - 69m2 DTSD', 'Bán nhà hẻm kinh doanh - khu ẩm thực Cư Xá Phú Lâm B - nhỉnh 4 tỷ - 69m2 DTSD. - 69m2 DTSD, trệt 2 lầu. - Giá 4,65 tỷ. - Nhà đúc kiên cố BTCT, thuận tiện vừa ở vừa kinh doanh mà ngay khu ẩm thực Quận 6 chỉ hơn 4tỷ. - Xe tải né nhau, thông với 119 Bà Hom - Cư Xá Phú Lâm B - Kinh Dương Vương đi lại trung tâm chỉ hơn 5p. TTTM Aeon Mall Bình Tân chỉ 4p. - Xung quanh đầy đủ tiện ích không thiếu thứ gì. - Khách quan tâm liên hệ em Thanh\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 26878612, 'VND', 23.00, NULL, NULL, NULL, 'Hồ Chí Minh', '6', '13', 'Kinh Dương Vương', NULL, NULL, 1, 0, 0, 0, 3252, 0, 1, '2026-04-07 08:24:41.740452', '2026-04-07 08:24:41.741459', 10),
(98, 'Tôi cần bán nhà Cầu Diễn 50m, ngõ xe máy cách ô tô 100m', 'Nhà 5tầng vị trí trung tâm Hồ Tùng Mậu- -dt 50m giá 9,2ty -lh [phone_number]cho thuê 20tr/t -tài chính phù hợp đầu tư nhỏ\n\n[direct-load-vietnam]', 'other', 'rent', 'active', 39062500, 'VND', 50.00, NULL, NULL, NULL, 'Hà Nội', 'Nam Từ Liêm', 'Cầu Diễn', 'Hồ Tùng Mậu', NULL, NULL, 0, 1, 0, 0, 3664, 0, 1, '2026-04-07 08:24:41.742912', '2026-04-07 08:24:41.742912', 11),
(99, 'Quang Trung - chợ Hạnh Thông Tây - trệt 1 lầu, 4m x 11m - hẻm xe hơi gần nhà, chỉ 3,8 tỷ', 'Quang Trung - chợ Hạnh Thông Tây, P8 Gò Vấp - trệt 1 lầu, 4m x 11m - hẻm xe hơi gần nhà. * Chỉ 3,8 tỷ. - Sổ vuông 44m2 nhà mới ở ngay, khu an ninh, hẻm trước nhà 3m, cách 1 căn ra hẻm xe hơi. - Thông Quang Trung ra Nguyễn Văn Khối, phường 8 Gò Vấp. - Chủ thiện chí, còn thương lượng. LH [phone_number]\n\n[direct-load-vietnam]', 'other', 'sale', 'sold', 3800000000, 'VND', 44.00, 2, 2, NULL, 'Hồ Chí Minh', 'Gò Vấp', '8', 'Quang Trung', NULL, NULL, 0, 0, 1, 1, 9243, 0, 1, '2026-04-07 08:24:41.744922', '2026-04-07 08:24:41.744922', 12),
(100, 'Bán đất 12.7m đường Lê Duẩn - gần ngã tư Thạch Cao', 'Bán đất 12.7m đường Lê Duẩn - gần ngã tư Thạch Cao. Bán đất kèm nhà kho kiên cố, có phòng làm việc, phòng bảo vệ, nhà vệ sinh khép kín. Vị trí đường QL1A, gần trục đường 60m nối biển Cửa Việt, gần kho hàng ga đường sắt Đông Hà. Chi tiết: - Diện tích: 12.6x22m. - Hướng Bắc. - Đường Lê Duẩn. Xem nhiều sản phẩm nhà đất bán tại huytruongbds (chấm) com. Liên hệ SDT em Huy Trương. +++++++ Huy Trương - Bất động sản Quảng Trị. - Đất nền dự án, Shophouse nhà phố Đông Hà, Quảng Trị. - Nhà đất mặt tiền Kinh doanh, đất diện tích lớn. - Đất biển Cửa Việt, mặt tiền Quốc phòng Quảng Trị. - Đất TMDV, đất diện tích lớn, đất giá trị lớn theo như cầu. - Đất biển khu vực Đồng Hới đến Quảng Nam.\n\n[direct-load-vietnam]', 'other', 'sale', 'active', 7600000000, 'VND', 277.20, 1, 1, NULL, 'Quảng Trị', 'Đông Hà', 'Đông Lương', 'Lê Duẩn', NULL, NULL, 1, 0, 0, 0, 2568, 1, 1, '2026-04-07 08:24:41.746867', '2026-04-07 08:24:41.746867', 3);

-- --------------------------------------------------------

--
-- Table structure for table `properties_propertyimage`
--

CREATE TABLE `properties_propertyimage` (
  `id` bigint(20) NOT NULL,
  `image` varchar(100) NOT NULL,
  `caption` varchar(200) NOT NULL,
  `is_primary` tinyint(1) NOT NULL,
  `order` smallint(5) UNSIGNED NOT NULL CHECK (`order` >= 0),
  `property_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `properties_propertyimage`
--

INSERT INTO `properties_propertyimage` (`id`, `image`, `caption`, `is_primary`, `order`, `property_id`) VALUES
(1, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 1),
(2, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 1),
(3, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 1),
(4, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 1),
(5, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 1),
(6, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 2),
(7, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 2),
(8, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 2),
(9, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 2),
(10, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 2),
(11, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 3),
(12, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 3),
(13, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 3),
(14, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 3),
(15, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 3),
(16, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 4),
(17, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 4),
(18, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 4),
(19, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 4),
(20, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 4),
(21, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 5),
(22, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 5),
(23, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 5),
(24, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 5),
(25, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 6),
(26, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 6),
(27, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 6),
(28, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 6),
(29, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 6),
(30, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 6),
(31, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 7),
(32, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 7),
(33, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 7),
(34, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 7),
(35, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 7),
(36, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 7),
(37, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 8),
(38, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 8),
(39, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 8),
(40, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 8),
(41, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 9),
(42, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 9),
(43, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 9),
(44, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 9),
(45, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 9),
(46, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 10),
(47, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 10),
(48, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 10),
(49, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 10),
(50, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 10),
(51, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 10),
(52, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 11),
(53, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 11),
(54, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 11),
(55, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 11),
(56, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 11),
(57, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 11),
(58, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 12),
(59, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 12),
(60, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 12),
(61, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 12),
(62, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 12),
(63, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 13),
(64, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 13),
(65, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 13),
(66, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 13),
(67, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 13),
(68, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 14),
(69, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 14),
(70, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 14),
(71, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 14),
(72, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 14),
(73, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 15),
(74, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 15),
(75, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 15),
(76, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 15),
(77, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 15),
(78, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 16),
(79, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 16),
(80, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 16),
(81, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 16),
(82, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 16),
(83, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 16),
(84, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 17),
(85, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 17),
(86, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 17),
(87, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 17),
(88, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 17),
(89, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 17),
(90, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 18),
(91, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 18),
(92, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 18),
(93, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 18),
(94, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 18),
(95, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 19),
(96, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 19),
(97, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 19),
(98, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 19),
(99, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 19),
(100, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 20),
(101, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 20),
(102, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 20),
(103, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 20),
(104, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 21),
(105, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 21),
(106, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 21),
(107, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 21),
(108, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 22),
(109, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 22),
(110, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 22),
(111, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 22),
(112, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 23),
(113, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 23),
(114, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 23),
(115, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 23),
(116, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 23),
(117, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 23),
(118, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 24),
(119, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 24),
(120, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 24),
(121, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 24),
(122, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 24),
(123, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 25),
(124, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 25),
(125, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 25),
(126, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 25),
(127, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 26),
(128, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 26),
(129, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 26),
(130, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 26),
(131, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 26),
(132, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 27),
(133, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 27),
(134, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 27),
(135, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 27),
(136, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 27),
(137, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 27),
(138, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 28),
(139, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 28),
(140, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 28),
(141, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 28),
(142, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 28),
(143, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 28),
(144, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 29),
(145, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 29),
(146, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 29),
(147, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 29),
(148, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 29),
(149, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 30),
(150, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 30),
(151, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 30),
(152, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 30),
(153, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 31),
(154, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 31),
(155, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 31),
(156, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 31),
(157, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 31),
(158, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 32),
(159, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 32),
(160, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 32),
(161, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 32),
(162, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 33),
(163, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 33),
(164, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 33),
(165, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 33),
(166, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 34),
(167, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 34),
(168, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 34),
(169, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 34),
(170, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 34),
(171, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 35),
(172, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 35),
(173, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 35),
(174, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 35),
(175, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 35),
(176, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 36),
(177, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 36),
(178, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 36),
(179, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 36),
(180, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 36),
(181, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 37),
(182, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 37),
(183, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 37),
(184, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 37),
(185, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 37),
(186, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 37),
(187, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 38),
(188, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 38),
(189, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 38),
(190, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 38),
(191, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 38),
(192, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 38),
(193, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 39),
(194, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 39),
(195, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 39),
(196, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 39),
(197, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 40),
(198, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 40),
(199, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 40),
(200, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 40),
(201, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 40),
(202, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 41),
(203, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 41),
(204, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 41),
(205, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 41),
(206, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 42),
(207, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 42),
(208, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 42),
(209, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 42),
(210, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 43),
(211, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 43),
(212, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 43),
(213, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 43),
(214, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 44),
(215, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 44),
(216, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 44),
(217, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 44),
(218, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 44),
(219, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 45),
(220, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 45),
(221, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 45),
(222, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 45),
(223, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 45),
(224, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 45),
(225, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 46),
(226, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 46),
(227, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 46),
(228, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 46),
(229, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 46),
(230, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 47),
(231, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 47),
(232, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 47),
(233, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 47),
(234, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 47),
(235, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 47),
(236, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 48),
(237, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 48),
(238, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 48),
(239, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 48),
(240, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 48),
(241, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 49),
(242, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 49),
(243, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 49),
(244, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 49),
(245, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 49),
(246, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 49),
(247, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 50),
(248, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 50),
(249, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 50),
(250, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 50),
(251, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 50),
(252, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 51),
(253, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 51),
(254, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 51),
(255, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 51),
(256, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 52),
(257, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 52),
(258, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 52),
(259, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 52),
(260, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 52),
(261, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 53),
(262, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 53),
(263, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 53),
(264, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 53),
(265, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 54),
(266, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 54),
(267, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 54),
(268, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 54),
(269, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 54),
(270, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 54),
(271, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 55),
(272, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 55),
(273, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 55),
(274, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 55),
(275, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 55),
(276, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 55),
(277, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 56),
(278, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 56),
(279, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 56),
(280, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 56),
(281, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 56),
(282, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 57),
(283, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 57),
(284, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 57),
(285, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 57),
(286, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 57),
(287, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 58),
(288, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 58),
(289, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 58),
(290, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 58),
(291, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 59),
(292, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 59),
(293, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 59),
(294, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 59),
(295, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 59),
(296, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 59),
(297, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 60),
(298, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 60),
(299, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 60),
(300, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 60),
(301, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 61),
(302, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 61),
(303, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 61),
(304, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 61),
(305, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 61),
(306, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 62),
(307, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 62),
(308, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 62),
(309, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 62),
(310, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 62),
(311, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 62),
(312, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 63),
(313, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 63),
(314, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 63),
(315, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 63),
(316, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 64),
(317, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 64),
(318, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 64),
(319, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 64),
(320, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 65),
(321, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 65),
(322, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 65),
(323, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 65),
(324, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 66),
(325, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 66),
(326, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 66),
(327, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 66),
(328, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 66),
(329, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 66),
(330, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 67),
(331, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 67),
(332, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 67),
(333, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 67),
(334, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 67),
(335, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 67),
(336, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 68),
(337, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 68),
(338, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 68),
(339, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 68),
(340, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 69),
(341, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 69),
(342, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 69),
(343, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 69),
(344, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 70),
(345, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 70),
(346, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 70),
(347, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 70),
(348, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 71),
(349, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 71),
(350, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 71),
(351, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 71),
(352, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 71),
(353, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 71),
(354, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 72),
(355, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 72),
(356, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 72),
(357, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 72),
(358, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 73),
(359, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 73),
(360, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 73),
(361, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 73),
(362, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 73),
(363, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 74),
(364, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 74),
(365, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 74),
(366, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 74),
(367, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 75),
(368, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 75),
(369, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 75),
(370, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 75),
(371, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 75),
(372, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 75),
(373, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 76),
(374, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 76),
(375, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 76),
(376, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 76),
(377, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 77),
(378, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 77),
(379, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 77),
(380, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 77),
(381, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 77),
(382, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 77),
(383, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 78),
(384, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 78),
(385, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 78),
(386, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 78),
(387, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 78),
(388, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 79),
(389, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 79),
(390, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 79),
(391, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 79),
(392, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 80),
(393, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 80),
(394, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 80),
(395, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 80),
(396, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 80),
(397, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 81),
(398, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 81),
(399, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 81),
(400, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 81),
(401, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 81),
(402, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 81),
(403, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 82),
(404, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 82),
(405, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 82),
(406, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 82),
(407, 'properties/seed/direct_seed_16.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 82),
(408, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 82),
(409, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 83),
(410, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 83),
(411, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 83),
(412, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 83),
(413, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 83),
(414, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 84),
(415, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 84),
(416, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 84),
(417, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 84),
(418, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 84),
(419, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 84),
(420, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 85),
(421, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 85),
(422, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 85),
(423, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 85),
(424, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 86),
(425, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 86),
(426, 'properties/seed/direct_seed_01.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 86),
(427, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 86),
(428, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 87),
(429, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 87),
(430, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 87),
(431, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 87),
(432, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 87),
(433, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 87),
(434, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 88),
(435, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 88),
(436, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 88),
(437, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 88),
(438, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 89),
(439, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 89),
(440, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 89),
(441, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 89),
(442, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 90),
(443, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 90),
(444, 'properties/seed/direct_seed_05.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 90),
(445, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 90),
(446, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 90),
(447, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 91),
(448, 'properties/seed/direct_seed_21.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 91),
(449, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 91),
(450, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 91),
(451, 'properties/seed/direct_seed_20.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 91),
(452, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 92),
(453, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 92),
(454, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 92),
(455, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 92),
(456, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 92),
(457, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 92),
(458, 'properties/seed/direct_seed_09.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 93),
(459, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 93),
(460, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 93),
(461, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 93),
(462, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 94),
(463, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 94),
(464, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 94),
(465, 'properties/seed/direct_seed_17.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 94),
(466, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 95),
(467, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 95),
(468, 'properties/seed/direct_seed_03.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 95),
(469, 'properties/seed/direct_seed_11.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 95),
(470, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 96),
(471, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 96),
(472, 'properties/seed/direct_seed_08.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 96),
(473, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 96),
(474, 'properties/seed/direct_seed_24.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 96),
(475, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #6 [direct-load-vietnam]', 0, 5, 96),
(476, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 97),
(477, 'properties/seed/direct_seed_15.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 97),
(478, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 97),
(479, 'properties/seed/direct_seed_10.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 97),
(480, 'properties/seed/direct_seed_22.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 97),
(481, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 98),
(482, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 98),
(483, 'properties/seed/direct_seed_19.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 98),
(484, 'properties/seed/direct_seed_18.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 98),
(485, 'properties/seed/direct_seed_02.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 98),
(486, 'properties/seed/direct_seed_14.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 99),
(487, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 99),
(488, 'properties/seed/direct_seed_04.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 99),
(489, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 99),
(490, 'properties/seed/direct_seed_13.jpg', '?nh minh h?a #1 [direct-load-vietnam]', 1, 0, 100),
(491, 'properties/seed/direct_seed_23.jpg', '?nh minh h?a #2 [direct-load-vietnam]', 0, 1, 100),
(492, 'properties/seed/direct_seed_06.jpg', '?nh minh h?a #3 [direct-load-vietnam]', 0, 2, 100),
(493, 'properties/seed/direct_seed_07.jpg', '?nh minh h?a #4 [direct-load-vietnam]', 0, 3, 100),
(494, 'properties/seed/direct_seed_12.jpg', '?nh minh h?a #5 [direct-load-vietnam]', 0, 4, 100);

-- --------------------------------------------------------

--
-- Table structure for table `property_features`
--

CREATE TABLE `property_features` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `property_id` char(36) NOT NULL,
  `feature_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_gallery`
--

CREATE TABLE `property_gallery` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `property_id` char(36) NOT NULL,
  `image_url` text NOT NULL,
  `caption` text DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `property_specs`
--

CREATE TABLE `property_specs` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `property_id` char(36) NOT NULL,
  `spec_label` varchar(100) NOT NULL,
  `spec_value` varchar(255) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `saved_properties`
--

CREATE TABLE `saved_properties` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `user_id` char(36) NOT NULL,
  `property_id` char(36) NOT NULL,
  `saved_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint(20) NOT NULL,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint(20) NOT NULL,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `jti` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `full_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `avatar_url` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'buyer',
  `location` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts_userprofile`
--
ALTER TABLE `accounts_userprofile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`),
  ADD KEY `idx_appt_buyer` (`buyer_id`,`status`),
  ADD KEY `idx_appt_seller` (`seller_id`,`status`);

--
-- Indexes for table `appointments_appointment`
--
ALTER TABLE `appointments_appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_appoint_property_id_ad168180_fk_propertie` (`property_id`),
  ADD KEY `appointments_appointment_user_id_ae788a47_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `availability_schedules`
--
ALTER TABLE `availability_schedules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_schedule` (`property_id`,`day_of_week`);

--
-- Indexes for table `availability_slots`
--
ALTER TABLE `availability_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_id` (`schedule_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `market_stats`
--
ALTER TABLE `market_stats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_stat` (`city`,`year`,`month`);

--
-- Indexes for table `news_articles`
--
ALTER TABLE `news_articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_news`
--
ALTER TABLE `news_news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_news_author_id_9f88be71_fk_auth_user_id` (`author_id`);

--
-- Indexes for table `price_predictions`
--
ALTER TABLE `price_predictions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `price_training_data`
--
ALTER TABLE `price_training_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_train_city` (`city`,`district`),
  ADD KEY `idx_train_area` (`area_sqm`,`actual_price`);

--
-- Indexes for table `properties`
--
ALTER TABLE `properties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `agent_id` (`agent_id`),
  ADD KEY `idx_prop_city` (`city`,`district`),
  ADD KEY `idx_prop_filter` (`listing_type`,`property_type`,`bedrooms`,`status`,`is_active`),
  ADD KEY `idx_prop_price` (`price`);

--
-- Indexes for table `properties_favorite`
--
ALTER TABLE `properties_favorite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `properties_favorite_user_id_property_id_22403a1e_uniq` (`user_id`,`property_id`),
  ADD KEY `properties_favorite_property_id_ba845687_fk_propertie` (`property_id`);

--
-- Indexes for table `properties_property`
--
ALTER TABLE `properties_property`
  ADD PRIMARY KEY (`id`),
  ADD KEY `properties_property_owner_id_6700dc90_fk_auth_user_id` (`owner_id`);

--
-- Indexes for table `properties_propertyimage`
--
ALTER TABLE `properties_propertyimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `properties_propertyi_property_id_883194e7_fk_propertie` (`property_id`);

--
-- Indexes for table `property_features`
--
ALTER TABLE `property_features`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_feat` (`property_id`,`feature_name`);

--
-- Indexes for table `property_gallery`
--
ALTER TABLE `property_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `property_specs`
--
ALTER TABLE `property_specs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `saved_properties`
--
ALTER TABLE `saved_properties`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_saved` (`user_id`,`property_id`),
  ADD KEY `property_id` (`property_id`);

--
-- Indexes for table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_id` (`token_id`);

--
-- Indexes for table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  ADD KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts_userprofile`
--
ALTER TABLE `accounts_userprofile`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `appointments_appointment`
--
ALTER TABLE `appointments_appointment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `news_news`
--
ALTER TABLE `news_news`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `properties_favorite`
--
ALTER TABLE `properties_favorite`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `properties_property`
--
ALTER TABLE `properties_property`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `properties_propertyimage`
--
ALTER TABLE `properties_propertyimage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=495;

--
-- AUTO_INCREMENT for table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts_userprofile`
--
ALTER TABLE `accounts_userprofile`
  ADD CONSTRAINT `accounts_userprofile_user_id_92240672_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `agents`
--
ALTER TABLE `agents`
  ADD CONSTRAINT `agents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `appointments_appointment`
--
ALTER TABLE `appointments_appointment`
  ADD CONSTRAINT `appointments_appoint_property_id_ad168180_fk_propertie` FOREIGN KEY (`property_id`) REFERENCES `properties_property` (`id`),
  ADD CONSTRAINT `appointments_appointment_user_id_ae788a47_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `availability_schedules`
--
ALTER TABLE `availability_schedules`
  ADD CONSTRAINT `availability_schedules_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `availability_slots`
--
ALTER TABLE `availability_slots`
  ADD CONSTRAINT `availability_slots_ibfk_1` FOREIGN KEY (`schedule_id`) REFERENCES `availability_schedules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `news_news`
--
ALTER TABLE `news_news`
  ADD CONSTRAINT `news_news_author_id_9f88be71_fk_auth_user_id` FOREIGN KEY (`author_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `price_predictions`
--
ALTER TABLE `price_predictions`
  ADD CONSTRAINT `price_predictions_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `properties`
--
ALTER TABLE `properties`
  ADD CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `properties_ibfk_2` FOREIGN KEY (`agent_id`) REFERENCES `agents` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `properties_favorite`
--
ALTER TABLE `properties_favorite`
  ADD CONSTRAINT `properties_favorite_property_id_ba845687_fk_propertie` FOREIGN KEY (`property_id`) REFERENCES `properties_property` (`id`),
  ADD CONSTRAINT `properties_favorite_user_id_7e4c50a0_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `properties_property`
--
ALTER TABLE `properties_property`
  ADD CONSTRAINT `properties_property_owner_id_6700dc90_fk_auth_user_id` FOREIGN KEY (`owner_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `properties_propertyimage`
--
ALTER TABLE `properties_propertyimage`
  ADD CONSTRAINT `properties_propertyi_property_id_883194e7_fk_propertie` FOREIGN KEY (`property_id`) REFERENCES `properties_property` (`id`);

--
-- Constraints for table `property_features`
--
ALTER TABLE `property_features`
  ADD CONSTRAINT `property_features_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_gallery`
--
ALTER TABLE `property_gallery`
  ADD CONSTRAINT `property_gallery_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `property_specs`
--
ALTER TABLE `property_specs`
  ADD CONSTRAINT `property_specs_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `saved_properties`
--
ALTER TABLE `saved_properties`
  ADD CONSTRAINT `saved_properties_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saved_properties_ibfk_2` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `token_blacklist_blacklistedtoken`
--
ALTER TABLE `token_blacklist_blacklistedtoken`
  ADD CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`);

--
-- Constraints for table `token_blacklist_outstandingtoken`
--
ALTER TABLE `token_blacklist_outstandingtoken`
  ADD CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
