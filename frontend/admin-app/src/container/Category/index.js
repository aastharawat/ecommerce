import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Layout from "../../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { addCategories } from "../../action/index.js";
import Input from "../../components/UI/Input/input";

export default function Category() {
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const [name, setname] = useState("");
  const [parentId, setparentId] = useState("");
  const [categoryImg, setcategoryImg] = useState("");

  const state = useSelector((state) => state.category);

  const handleClose = () => {
    setshow(false);
  };

  const handleSave = (e) => {
    setshow(false);

    const newCategory = { name, parentId, categoryImg };
    dispatch(addCategories(newCategory));
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
    state.category.map((item) => {
      myCategories.push(<option value={item._id}>{item.name}</option>);
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
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />

            <select
              className="form-control"
              onChange={(e) => {
                setparentId(e.target.value);
              }}
            >
              <option>Select category</option>
              {getParentCategories()}
            </select>

            <Input
              placeholder="upload category image"
              type="file"
              onChange={(e) => {
                setcategoryImg(e.target.files[0]);
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
