import React, { useMemo, useState } from "react";
// import { Link } from "react-router-dom";

import style from "./PopOfDeleteBike.module.scss";
// import { useNavigate } from "react-router-dom";

import { IFoodTableRow } from "../BikesPage";
import { SweetPopup } from "src/components/SweetPopup/SweetPopup";

// import { useNavigate } from "react-router-dom";
// import { cla } from "src/App";
import { WideButton } from "src/components/buttons/WideButton";
// import { useAppSelector } from "src/app/hooks";

export const PopOfDeleteBike: React.FC<{
  userListIndex: number;
  currFoodEntry: IFoodTableRow;
  deleteBike: (id: string) => Promise<void>;
  getBikes: (isMounted?: { v: boolean }) => Promise<void>;
}> = ({ userListIndex, deleteBike, currFoodEntry, getBikes }) => {
  const [showDelBikePop, setShowDelBikePop] = useState(false);
  // console.log(showDelBikePop);
  // const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // const listId = useMemo(() => {
  //   return String(userListIndex);
  // }, [userListIndex]);

  return (
    <div className={style.download}>
      <span
        onClick={() => {
          // deleteBike(cell.value as string);
          setShowDelBikePop((prev) => true);
        }}
      >
        Del
      </span>
      <SweetPopup
        show={showDelBikePop}
        // title={t("inviteNewUser")}
        closerFn={() => {
          // console.log("cllllllllllll");
          setShowDelBikePop((prev) => false);
        }}
        content={
          <div className={style.delConfirm}>
            <h2
              className={style.h2}
            >{`Really want to delete ${currFoodEntry?.name} ${currFoodEntry?.calories}?`}</h2>

            <WideButton
              className={style.goDel}
              kind="bBlue"
              onClick={async () => {
                if (isLoading) {
                  return;
                }

                setIsLoading((prev) => true);

                await deleteBike(currFoodEntry.id);
                setShowDelBikePop((prev) => false);

                getBikes();

                setTimeout(() => {
                  setIsLoading((prev) => false);
                }, 1000);
              }}
              text="Yes"
              isLoading={isLoading}
            />

            <WideButton
              className={style.cancelDel}
              onClick={() => {
                // console.log("haaa");
                setShowDelBikePop((prev) => false);
              }}
              kind="bGray"
              text="No"
            />
          </div>
        }
        backButtonShouldClose={false}
        showCloseButton={true}
      />
    </div>
  );
};
