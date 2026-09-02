package com.insightpest.modules.bookings.services;

import com.insightpest.common.exception.ResourceNotFoundException;
import com.insightpest.modules.bookings.dto.BookingResponse;
import com.insightpest.modules.bookings.dto.BookingSlotResponse;
import com.insightpest.modules.bookings.dto.CreateBookingRequest;
import com.insightpest.modules.bookings.entities.BookingEntity;
import com.insightpest.modules.bookings.repositories.BookingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SecureRandom random = new SecureRandom();

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Transactional(readOnly = true)
    public List<BookingSlotResponse> getAvailability(String date) {
        String queryDate = (date != null && !date.isBlank()) ? date : "2026-09-05";
        List<BookingSlotResponse> slots = new ArrayList<>();
        slots.add(new BookingSlotResponse("slot-1", queryDate, "08:00 AM - 10:00 AM", true, "Morning"));
        slots.add(new BookingSlotResponse("slot-2", queryDate, "10:00 AM - 12:00 PM", true, "Morning"));
        slots.add(new BookingSlotResponse("slot-3", queryDate, "01:00 PM - 03:00 PM", true, "Afternoon"));
        slots.add(new BookingSlotResponse("slot-4", queryDate, "03:00 PM - 05:00 PM", true, "Afternoon"));
        return slots;
    }

    @Transactional
    public BookingResponse createBooking(CreateBookingRequest request) {
        String bookingId = "BK-" + (10000 + random.nextInt(90000));

        BookingEntity entity = new BookingEntity();
        entity.setBookingId(bookingId);
        entity.setServiceSlug(request.getServiceSlug());
        entity.setServiceTitle(request.getServiceTitle() != null ? request.getServiceTitle() : request.getServiceSlug());
        entity.setPropertyType(request.getPropertyType());
        entity.setScheduledDate(request.getScheduledDate());
        entity.setScheduledTime(request.getScheduledTime());
        entity.setCustomerName(request.getCustomerName());
        entity.setEmail(request.getEmail());
        entity.setPhone(request.getPhone());
        entity.setAddress(request.getAddress());
        entity.setCity(request.getCity());
        entity.setState(request.getState());
        entity.setZipCode(request.getZipCode());
        entity.setNotes(request.getNotes());
        entity.setStatus("REQUESTED");

        BookingEntity saved = bookingRepository.save(entity);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BookingResponse getBookingById(String bookingId) {
        BookingEntity entity = bookingRepository.findByBookingId(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "bookingId", bookingId));
        return mapToResponse(entity);
    }

    private BookingResponse mapToResponse(BookingEntity entity) {
        return new BookingResponse(
                entity.getId(),
                entity.getBookingId(),
                entity.getServiceSlug(),
                entity.getServiceTitle(),
                entity.getPropertyType(),
                entity.getScheduledDate(),
                entity.getScheduledTime(),
                entity.getCustomerName(),
                entity.getEmail(),
                entity.getPhone(),
                entity.getAddress(),
                entity.getCity(),
                entity.getState(),
                entity.getZipCode(),
                entity.getNotes(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
