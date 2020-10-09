import React, { useEffect } from "react";
import "../style.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../action/index";
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
                <ul>
                  {item.subCategories.map((subItem) => (
                    <li>
                      <a>{subItem.name}</a>
                    </li>
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
