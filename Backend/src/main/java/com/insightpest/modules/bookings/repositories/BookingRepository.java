package com.insightpest.modules.bookings.repositories;

import com.insightpest.modules.bookings.entities.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, String> {
    Optional<BookingEntity> findByBookingId(String bookingId);
    List<BookingEntity> findByScheduledDate(String scheduledDate);
}
