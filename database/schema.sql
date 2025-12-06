-- ============================================
-- ARMANDO FITNESS - MySQL Database Schema
-- ============================================
-- Execute this script in MySQL to create all tables
-- Compatible with MySQL 8.0+

-- Drop tables if exist (in reverse order of dependencies)
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS availability_exceptions;
DROP TABLE IF EXISTS trainer_availability;
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS users;

-- ============================================
-- USERS - Usuarios del sistema
-- ============================================
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('admin', 'client') DEFAULT 'client',
  avatar_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_users_email (email),
  INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- PLANS - Planes de suscripción
-- ============================================
CREATE TABLE plans (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  classes_per_month INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  features JSON,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_plans_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- SUBSCRIPTIONS - Suscripciones de usuarios
-- ============================================
CREATE TABLE subscriptions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  plan_id VARCHAR(36) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  remaining_classes INT NOT NULL,
  status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
  payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES plans(id),
  INDEX idx_subscriptions_user (user_id),
  INDEX idx_subscriptions_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TRAINER_AVAILABILITY - Disponibilidad semanal
-- ============================================
CREATE TABLE trainer_availability (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  day_of_week TINYINT NOT NULL COMMENT '0=Domingo, 1=Lunes, ..., 6=Sábado',
  start_hour TINYINT COMMENT 'Hora de inicio (0-23)',
  end_hour TINYINT COMMENT 'Hora de fin (0-23)',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY uk_day_of_week (day_of_week),
  CHECK (day_of_week >= 0 AND day_of_week <= 6),
  CHECK (start_hour >= 0 AND start_hour <= 23),
  CHECK (end_hour >= 0 AND end_hour <= 23)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- AVAILABILITY_EXCEPTIONS - Excepciones de horario
-- ============================================
CREATE TABLE availability_exceptions (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  exception_date DATE NOT NULL UNIQUE,
  is_available BOOLEAN DEFAULT FALSE,
  start_hour TINYINT COMMENT 'Si is_available=true, hora de inicio',
  end_hour TINYINT COMMENT 'Si is_available=true, hora de fin',
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_exceptions_date (exception_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- BOOKINGS - Reservas de clases
-- ============================================
CREATE TABLE bookings (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  subscription_id VARCHAR(36) NOT NULL,
  booking_date DATE NOT NULL,
  booking_hour TINYINT NOT NULL COMMENT 'Hora de la clase (0-23)',
  status ENUM('confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'confirmed',
  notes TEXT,
  cancelled_at TIMESTAMP NULL,
  cancel_reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id),
  UNIQUE KEY uk_date_hour (booking_date, booking_hour),
  INDEX idx_bookings_user (user_id),
  INDEX idx_bookings_date (booking_date),
  INDEX idx_bookings_status (status),
  CHECK (booking_hour >= 0 AND booking_hour <= 23)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- NOTIFICATIONS - Notificaciones/Recordatorios
-- ============================================
CREATE TABLE notifications (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  booking_id VARCHAR(36),
  type ENUM('reminder_24h', 'reminder_1h', 'booking_confirmed', 'booking_cancelled') NOT NULL,
  channel ENUM('whatsapp', 'email', 'push') NOT NULL,
  status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
  scheduled_at TIMESTAMP,
  sent_at TIMESTAMP NULL,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  INDEX idx_notifications_user (user_id),
  INDEX idx_notifications_status (status),
  INDEX idx_notifications_scheduled (scheduled_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT DEFAULT DATA
-- ============================================

-- Insertar usuario administrador (Armando)
INSERT INTO users (id, email, password_hash, name, phone, role) VALUES
('admin-001', 'armando@armandofitness.com', '$2b$10$examplehashhere', 'Luis Armando Incio', '+1 555 123 4567', 'admin');

-- Insertar planes
INSERT INTO plans (id, name, description, classes_per_month, price, features, is_popular) VALUES
('plan-basic', 'Básico', 'Perfecto para mantenerte activo y aprender la técnica correcta.', 6, 60.00, 
  '["6 Clases al mes", "Evaluación inicial", "Rutina personalizada", "Soporte por WhatsApp Lunes-Viernes"]', FALSE),
('plan-pro', 'Pro', 'El equilibrio ideal para ver resultados constantes.', 9, 85.00,
  '["9 Clases al mes", "Evaluación mensual", "Rutina personalizada + Nutrición básica", "Soporte por WhatsApp 24/7", "Acceso a comunidad exclusiva"]', TRUE),
('plan-elite', 'Élite', 'Transformación total con acompañamiento intensivo.', 12, 110.00,
  '["12 Clases al mes", "Evaluación quincenal", "Plan nutricional completo", "Soporte prioritario 24/7", "Camiseta oficial ArmandoFitness", "Descuento en suplementos"]', FALSE);

-- Insertar disponibilidad semanal del entrenador
INSERT INTO trainer_availability (id, day_of_week, start_hour, end_hour, is_active) VALUES
('avail-0', 0, NULL, NULL, FALSE),  -- Domingo - No disponible
('avail-1', 1, 6, 21, TRUE),        -- Lunes
('avail-2', 2, 6, 21, TRUE),        -- Martes
('avail-3', 3, 6, 21, TRUE),        -- Miércoles
('avail-4', 4, 6, 21, TRUE),        -- Jueves
('avail-5', 5, 6, 21, TRUE),        -- Viernes
('avail-6', 6, 8, 14, TRUE);        -- Sábado (horario reducido)

-- Insertar excepciones (días festivos)
INSERT INTO availability_exceptions (id, exception_date, is_available, reason) VALUES
('exc-001', '2024-12-25', FALSE, 'Navidad'),
('exc-002', '2024-12-31', FALSE, 'Fin de Año'),
('exc-003', '2025-01-01', FALSE, 'Año Nuevo');
