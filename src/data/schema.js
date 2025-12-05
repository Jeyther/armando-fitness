/**
 * DATABASE SCHEMA - Armando Fitness
 * 
 * Este archivo define la estructura de la base de datos.
 * Actualmente usamos datos en memoria (mock), pero esta estructura
 * es compatible con PostgreSQL, MySQL, o cualquier DB relacional.
 */

// ============================================
// USERS - Usuarios del sistema
// ============================================
// Incluye clientes y el administrador (Armando)
export const USERS_SCHEMA = `
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  phone         VARCHAR(20),
  role          VARCHAR(20) DEFAULT 'client', -- 'admin' | 'client'
  avatar_url    VARCHAR(500),
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// ============================================
// PLANS - Planes de suscripción
// ============================================
export const PLANS_SCHEMA = `
CREATE TABLE plans (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              VARCHAR(100) NOT NULL,
  description       TEXT,
  classes_per_month INTEGER NOT NULL,
  price             DECIMAL(10,2) NOT NULL,
  features          JSONB, -- Array of feature strings
  is_active         BOOLEAN DEFAULT true,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// ============================================
// SUBSCRIPTIONS - Suscripciones de usuarios a planes
// ============================================
export const SUBSCRIPTIONS_SCHEMA = `
CREATE TABLE subscriptions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id           UUID REFERENCES plans(id),
  start_date        DATE NOT NULL,
  end_date          DATE NOT NULL,
  remaining_classes INTEGER NOT NULL,
  status            VARCHAR(20) DEFAULT 'active', -- 'active' | 'expired' | 'cancelled'
  payment_status    VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'paid' | 'failed'
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// ============================================
// TRAINER_AVAILABILITY - Disponibilidad semanal del entrenador
// ============================================
// Define las horas disponibles para cada día de la semana
export const TRAINER_AVAILABILITY_SCHEMA = `
CREATE TABLE trainer_availability (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL, -- 0=Domingo, 1=Lunes, ..., 6=Sábado
  start_hour  INTEGER NOT NULL, -- 0-23
  end_hour    INTEGER NOT NULL, -- 0-23
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(day_of_week)
);
`;

// ============================================
// AVAILABILITY_EXCEPTIONS - Excepciones de disponibilidad
// ============================================
// Para días específicos donde la disponibilidad cambia (vacaciones, eventos, etc.)
export const AVAILABILITY_EXCEPTIONS_SCHEMA = `
CREATE TABLE availability_exceptions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date         DATE NOT NULL UNIQUE,
  is_available BOOLEAN DEFAULT false,
  start_hour   INTEGER, -- Si is_available=true, horario especial
  end_hour     INTEGER,
  reason       VARCHAR(255),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// ============================================
// BOOKINGS - Reservas de clases
// ============================================
export const BOOKINGS_SCHEMA = `
CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  date            DATE NOT NULL,
  hour            INTEGER NOT NULL, -- 0-23
  status          VARCHAR(20) DEFAULT 'confirmed', -- 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  notes           TEXT,
  cancelled_at    TIMESTAMP,
  cancel_reason   VARCHAR(255),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(date, hour) -- Solo una clase por hora
);
`;

// ============================================
// NOTIFICATIONS - Notificaciones/Recordatorios
// ============================================
export const NOTIFICATIONS_SCHEMA = `
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  booking_id  UUID REFERENCES bookings(id) ON DELETE CASCADE,
  type        VARCHAR(50) NOT NULL, -- 'reminder_24h' | 'reminder_1h' | 'booking_confirmed' | 'booking_cancelled'
  channel     VARCHAR(20) NOT NULL, -- 'whatsapp' | 'email' | 'push'
  status      VARCHAR(20) DEFAULT 'pending', -- 'pending' | 'sent' | 'failed'
  sent_at     TIMESTAMP,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

// ============================================
// FULL SCHEMA
// ============================================
export const FULL_SCHEMA = `
${USERS_SCHEMA}
${PLANS_SCHEMA}
${SUBSCRIPTIONS_SCHEMA}
${TRAINER_AVAILABILITY_SCHEMA}
${AVAILABILITY_EXCEPTIONS_SCHEMA}
${BOOKINGS_SCHEMA}
${NOTIFICATIONS_SCHEMA}
`;

export default FULL_SCHEMA;
