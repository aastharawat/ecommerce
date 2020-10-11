import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../action/index";
import { Link } from "react-router-dom";
export default function MenuHeader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector((state) => state.category.category);
  const renderCategories = () => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          <span>{category.name}</span>
          <ul>
            {category.subCategories.map((item) => (
              <li>
                <a>{item.name}</a>
                <ul style={{ display: "block", fontSize: "13px" }}>
                  {item.subCategories.map((subItem) => (
                    <Link to={`/${subItem.slug}`}>
                      <a>{subItem.name}</a>
                    </Link>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return myCategories;
  };
  return (
    <div className="menuHeader">
      <ul>{renderCategories()}</ul>
    </div>
  );
}
