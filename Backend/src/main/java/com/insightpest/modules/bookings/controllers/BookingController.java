package com.insightpest.modules.bookings.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.bookings.dto.BookingResponse;
import com.insightpest.modules.bookings.dto.BookingSlotResponse;
import com.insightpest.modules.bookings.dto.CreateBookingRequest;
import com.insightpest.modules.bookings.services.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@Tag(name = "Bookings", description = "Endpoints for slot availability checks, inspection reservations, and appointment status")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/availability")
    @Operation(summary = "Get confirmed open arrival time slots for a given date")
    public ResponseEntity<ApiResponse<List<BookingSlotResponse>>> getAvailability(
            @RequestParam(required = false) String date) {
        List<BookingSlotResponse> slots = bookingService.getAvailability(date);
        return ResponseEntity.ok(ApiResponse.success(slots));
    }

    @PostMapping
    @Operation(summary = "Reserve and schedule an inspection or treatment appointment")
    public ResponseEntity<ApiResponse<BookingResponse>> createBooking(
            @Valid @RequestBody CreateBookingRequest request) {
        BookingResponse booking = bookingService.createBooking(request);
        return new ResponseEntity<>(
                ApiResponse.success("Appointment successfully requested! Our coordinator will contact you shortly.", booking),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    @Operation(summary = "List all scheduled appointments (Admin/Staff view)")
    public ResponseEntity<ApiResponse<List<BookingResponse>>> getAllBookings() {
        List<BookingResponse> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success(bookings));
    }

    @GetMapping("/{bookingId}")
    @Operation(summary = "Lookup a specific appointment by public booking code")
    public ResponseEntity<ApiResponse<BookingResponse>> getBookingById(@PathVariable String bookingId) {
        BookingResponse booking = bookingService.getBookingById(bookingId);
        return ResponseEntity.ok(ApiResponse.success(booking));
    }
}
