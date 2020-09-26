import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../action/index.js";
import Input from "../../components/UI/Input/input";

export default function Category() {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [categoryName, setcategoryName] = useState(false);
  const [parentCategoryName, setparentCategoryName] = useState(false);
  const [categoryImage, setcategoryImage] = useState(false);

  const state = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getCategories());
  });

  const handleClose = () => {
    setshow(false);
  };

  const handleSave = () => {
    const category = { categoryName, parentCategoryName, categoryImage };
    console.log(category);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    categories.map((category) => {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.subCategories.length > 0 && (
            <ul>{renderCategories(category.subCategories)}</ul>
          )}
        </li>
      );
    });
    return myCategories;
  };

  const getParentCategories = () => {
    let myCategories = [];
    state.category.map((category) => {
      myCategories.push(<option key={category.name}>{category.name}</option>);
    });
    return myCategories;
  };

  return (
    <Layout sidebar>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button
                onClick={() => {
                  setshow(!show);
                }}
              >
                Add
              </button>
            </div>
          </Col>
          <ul>{renderCategories(state.category)}</ul>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              label="Category name"
              placeholder="Enter category name"
              type="text"
              value={categoryName}
              onChange={(e) => {
                setcategoryName(e.target.value);
              }}
            />

            <select
              onChange={(e) => {
                setparentCategoryName(e.target.value);
              }}
            >
              <option>Select category</option>
              {getParentCategories()}
            </select>

            <Input
              label="Upload category image"
              placeholder="upload category image"
              type="file"
              onChange={(e) => {
                setcategoryImage(e.target.files[0]);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Layout>
  );
}
