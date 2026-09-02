package com.insightpest.modules.contact.controllers;

import com.insightpest.common.response.ApiResponse;
import com.insightpest.modules.contact.dto.ContactRequest;
import com.insightpest.modules.contact.dto.ContactResponse;
import com.insightpest.modules.contact.services.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contact")
@Tag(name = "Contact", description = "Endpoints for customer contact messages and general inquiries")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @Operation(summary = "Submit a customer contact message or general question")
    public ResponseEntity<ApiResponse<ContactResponse>> sendMessage(
            @Valid @RequestBody ContactRequest request) {
        ContactResponse response = contactService.saveMessage(request);
        return new ResponseEntity<>(
                ApiResponse.success("Message received! Our team will get back to you shortly.", response),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    @Operation(summary = "List all customer support contact messages (Admin/Staff view)")
    public ResponseEntity<ApiResponse<List<ContactResponse>>> getAllMessages() {
        List<ContactResponse> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success(messages));
    }
}
