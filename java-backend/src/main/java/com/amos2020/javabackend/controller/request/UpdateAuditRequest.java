package com.amos2020.javabackend.controller.request;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

public class UpdateAuditRequest extends BasicRequest {

    // mandatory
    @Getter
    @Setter
    private String auditName;

    // mandatory
    @Getter
    @Setter
    private Date startDate;

    // Not mandatory
    @Getter
    @Setter
    private Date endDate;

    // Not mandatory
    @Getter
    @Setter
    private List<Integer> contactPeople;

    public void isValid() throws IllegalArgumentException {
        assertNameIsValid(auditName);
        assertDateIsNotNull(startDate);
        assertDatesAreValid(startDate, endDate);
        assertIdsAreValid(contactPeople);
    }
}
