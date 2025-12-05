-- ============================================
-- ARMANDO FITNESS - Sample Data for Testing
-- ============================================
-- Execute this AFTER schema.sql to populate test data

-- ============================================
-- SAMPLE CLIENTS
-- ============================================
INSERT INTO users (id, email, password_hash, name, phone, role) VALUES
('user-001', 'maria@email.com', '$2b$10$examplehash1', 'María López', '+1 555 234 5678', 'client'),
('user-002', 'carlos@email.com', '$2b$10$examplehash2', 'Carlos Rodríguez', '+1 555 345 6789', 'client'),
('user-003', 'ana@email.com', '$2b$10$examplehash3', 'Ana Martínez', '+1 555 456 7890', 'client'),
('user-004', 'pedro@email.com', '$2b$10$examplehash4', 'Pedro Sánchez', '+1 555 567 8901', 'client'),
('user-005', 'lucia@email.com', '$2b$10$examplehash5', 'Lucía Fernández', '+1 555 678 9012', 'client');

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
INSERT INTO subscriptions (id, user_id, plan_id, start_date, end_date, remaining_classes, status, payment_status) VALUES
('sub-001', 'user-001', 'plan-pro', '2024-12-01', '2024-12-31', 7, 'active', 'paid'),
('sub-002', 'user-002', 'plan-basic', '2024-12-01', '2024-12-31', 4, 'active', 'paid'),
('sub-003', 'user-003', 'plan-elite', '2024-12-01', '2024-12-31', 10, 'active', 'paid'),
('sub-004', 'user-004', 'plan-pro', '2024-12-01', '2024-12-31', 5, 'active', 'paid'),
('sub-005', 'user-005', 'plan-basic', '2024-12-01', '2024-12-31', 6, 'active', 'paid');

-- ============================================
-- BOOKINGS
-- ============================================
INSERT INTO bookings (id, user_id, subscription_id, booking_date, booking_hour, status, notes) VALUES
('book-001', 'user-001', 'sub-001', '2024-12-06', 9, 'confirmed', NULL),
('book-002', 'user-002', 'sub-002', '2024-12-06', 10, 'confirmed', NULL),
('book-003', 'user-003', 'sub-003', '2024-12-06', 11, 'confirmed', 'Primera clase del mes'),
('book-004', 'user-001', 'sub-001', '2024-12-09', 8, 'confirmed', NULL),
('book-005', 'user-004', 'sub-004', '2024-12-09', 10, 'confirmed', 'Enfocarse en piernas'),
('book-006', 'user-005', 'sub-005', '2024-12-10', 7, 'confirmed', NULL),
('book-007', 'user-003', 'sub-003', '2024-12-10', 16, 'confirmed', NULL),
('book-008', 'user-002', 'sub-002', '2024-12-05', 14, 'cancelled', NULL),
('book-009', 'user-001', 'sub-001', '2024-12-04', 9, 'completed', 'Excelente sesión');

-- Update cancelled booking
UPDATE bookings SET cancelled_at = '2024-12-04 18:00:00', cancel_reason = 'Emergencia personal' WHERE id = 'book-008';

-- ============================================
-- NOTIFICATIONS
-- ============================================
INSERT INTO notifications (id, user_id, booking_id, type, channel, status, scheduled_at, sent_at) VALUES
('notif-001', 'user-001', 'book-001', 'reminder_24h', 'whatsapp', 'pending', '2024-12-05 09:00:00', NULL),
('notif-002', 'user-002', 'book-002', 'reminder_24h', 'whatsapp', 'pending', '2024-12-05 10:00:00', NULL),
('notif-003', 'user-001', 'book-009', 'booking_confirmed', 'whatsapp', 'sent', '2024-12-01 10:00:00', '2024-12-01 10:01:00');
