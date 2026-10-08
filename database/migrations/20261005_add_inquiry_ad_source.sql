ALTER TABLE service_inquiries
  ADD COLUMN ad_source VARCHAR(40) NULL AFTER contact_email;