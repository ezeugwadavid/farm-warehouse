import React, { useEffect, useState } from "react";
import "./added-farm.styles.scss";
import ArrowRight from "../../assets/arrow-right.svg";
import ArrowLeft from "../../assets/arrow-left-icon.svg";
import DelIcon from "../../assets/del-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import FeatherIcon from "../../assets/feather.svg";
import FarmNameIcon from "../../assets/farm-name-icon.svg";
import LongitudeIcon from "../../assets/longitude-icon.svg";
import FileTypeIcon from "../../assets/file-type-icon.svg";
import ReactPaginate from "react-paginate";

const AddedFarm = () => {
  const getFarms = localStorage.getItem("farm");
  let farms;
  if (getFarms !== "undefined") {
    farms = JSON.parse(getFarms);
  }

  const [itemOffset, setItemOffset] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 1;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % farms.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(farms.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(farms.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, farms]);

  return (
    farms &&
    farms.length > 0 && (
      <div className="added-farm-container">
        {currentItems?.map((farm) => {
          return (
            <div
              className="yellow-farm-container"
              key={itemOffset + 1}
            >
              <div className="container-top">
                <div className="farm-num">
                  Farm {itemOffset + 1}
                </div>
                <div className="action-icons">
                  <img src={EditIcon} alt="" className="edit-icon" />
                  <img src={DelIcon} alt="" className="del-icon" />
                </div>
              </div>

              <div className="container-middle">
                <div className="left-data">
                  <div className="f-details">
                    <img src={FarmNameIcon} alt="" />
                    <div className="table-title">FARM NAME</div>
                  </div>
                  <div className="table-val">{farm.name}</div>
                </div>

                <div className="center-data">
                  <div className="f-details">
                    <img src={LongitudeIcon} alt="" />
                    <div className="table-title">LONGITUDE</div>
                  </div>
                  <div className="long-num">{farm.long}</div>
                </div>

                <div className="end-data">
                  <div className="f-details">
                    <div className="table-title">LATITUDE</div>
                  </div>
                  <div className="lat-num">{farm.lat}</div>
                </div>
              </div>

              <div className="container-end">
                <div className="end-top">
                  <div className="crops-produced">
                    <img className="leaf-icon" src={FeatherIcon} alt="" />
                    <div className="prod-text">CROPS PRODUCED</div>
                  </div>
                  <div className="docs">DOCUMENTS</div>
                </div>

                <div className="end-bottom">
                  {farm.crops.map((crop) => {
                    return (
                      <div
                        className="crop-badges"
                        key={parseInt(farm.crops.indexOf(crop)) + 1}
                      >
                        <div className="crop-item">{crop.cropname}</div>
                      </div>
                    );
                  })}

                  <img src={FileTypeIcon} alt="" />
                </div>
              </div>
            </div>
          );
        })}

        <ReactPaginate
          breakLabel=".."
          nextLabel={<img src={ArrowRight} />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={<img src={ArrowLeft} />}
          renderOnZeroPageCount={null}
          containerClassName="controls"
          pageLinkClassName="dot" //used to remove default numbers
          previousLinkClassName="dot-item"
          nextLinkClassName="dot-item"
          activeLinkClassName="dot-item"
          activeClassName="dot-item-dark"
          pagination={{ simple: true }}
          pageClassName="dot-item" //class for control item when its not the active class
        />

        <div className="btm-hr">
          <div className="hr-line" />
          <div className="hr-txt">Farm</div>
          <hr className="hr-line" />
        </div>
      </div>
    )
  );
};

export default AddedFarm;
