import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SearchBarcm = ({ onSearch }) => {
  const handleSearch = (event) => {
    const query = event.target.value.trim();
    onSearch(query);
  };

  return (
    <div style={{ position: "relative" }}>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="검색할 내용을 입력하세요"
          className="me-1 w-75 searchBar"
          aria-label="Search"
          onChange={handleSearch}
        />
        <Button
          className="searchBtn"
          variant="outline-primary"
          size="sm"
          onClick={handleSearch}
        >
          검색
        </Button>
      </Form>
    </div>
  );
};

export default SearchBarcm;
