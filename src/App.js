import React from "react";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SocialLoginSuccess from "./Pages/SocialLoginSuccess";
import SocialLoginSuccessKakao from "./Pages/SocialLoginSuccessKakao";
import CallBack from "./Components/CallBack";
import UserUpdate from "./Pages/UserUpdate";
import FindAccountEmail from "./Pages/FindAccountEmail";
import FindAccountPassword from "./Pages/FindAccountPassword";
import Notice from "./Pages/Notice";
import RouteTrip from "./Pages/RouteTrip";
import RouteTripDetail from "./Pages/RouteTripDetail";
import RouteTripUpdate from "./Pages/RouteTripUpdate";
import RouteTripWrite from "./Pages/RouteTripWrite";
import Write from "./Pages/Write";
import Update from "./Pages/Update";
import Detail from "./Pages/Detail";
import ReviewWrite from "./Pages/ReviewWrite";
import UserBoard from "./Pages/UserBoard";
import UserFreeBoard from "./Pages/UserFreeBoard";
import UserRegion from "./Pages/UserRegion";
import UserRegionBoard from "./Pages/UserRegionBoard";
import UserMypage from "./Pages/UserMypage";
import AdminMypage from "./Pages/AdminMypage";
import AdminUserList from "./Pages/AdminUserList";
import AdminUserReport from "./Pages/AdminUserReport";
import AdminUserReportBE from "./Pages/AdminUserReportBE";
import AdminStatistics from "./Pages/AdminStatistics";
import NotFound from "./Pages/NotFound";
import FreeBoardDetail from "./Components/UserBoards/FreeBoardDetail";
import MyInquiry from "./Components/MyPage/MyInquiry";
import AdminInquiry from "./Components/Admin/AdminInquiry";
import ReviewMain from "./Pages/ReviewMain";
import UserWatchlist from "./Pages/UserWatchlist";
import MyReview from "./Components/MyPage/MyReview";
import MyReviewDetailPage from "./Pages/MyReviewDetailPage";
import NoticeWrite from "./Components/NoticeBoard/NoticeWrite";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login user={user} setUser={setUser} />} />
      <Route
        path="/register"
        element={<Register user={user} setUser={setUser} />}
      />
      <Route path="/naver" element={<Login user={user} setUser={setUser} />} />
      <Route
        path="/socialloginsuccess"
        element={<SocialLoginSuccess user={user} setUser={setUser} />}
      />
      <Route path="/kakaologin" element={<CallBack />} />
      <Route
        path="/socialloginsuccesskakao"
        element={<SocialLoginSuccessKakao user={user} setUser={setUser} />}
      />
      <Route path="/kakaologout" element={<Home />} />
      <Route path="/userupdate" element={<UserUpdate />} />
      <Route path="/findaccountemail" element={<FindAccountEmail />} />
      <Route path="/findaccountpassword" element={<FindAccountPassword />} />
      <Route path="/notice" element={<Notice />} />
      <Route path="/routetrip" element={<RouteTrip />} />
      <Route path="/routetripwrite" element={<RouteTripWrite />} />
      <Route path="/recomend_best" element={<RouteTripDetail />} />
      <Route path="/recommendupdate" element={<RouteTripUpdate />} />
      <Route path="/write" element={<Write />} />
      <Route path="/update" element={<Update />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/reviewwrite" element={<ReviewWrite />} />
      <Route path="/userboard" element={<UserBoard />} />
      <Route path="/userfreeboard" element={<UserFreeBoard />} />
      <Route path="/userregion" element={<UserRegion />} />
      <Route path="/userregionboard" element={<UserRegionBoard />} />
      <Route path="boarddetail" element={<FreeBoardDetail />} />
      <Route path="/usermypage" element={<UserMypage />} />
      <Route path="/userwatchlist" element={<UserWatchlist />} />
      <Route path="/usermypageinquiry" element={<MyInquiry />} />
      <Route path="/usermypageinquiryadmin" element={<AdminInquiry />} />
      <Route path="/adminmypage" element={<AdminMypage />} />
      <Route path="/adminuserlist" element={<AdminUserList />} />
      <Route path="/adminuserreport1" element={<AdminUserReport />} />
      <Route path="/adminuserreport" element={<AdminUserReportBE />} />
      <Route path="/adminstatistics" element={<AdminStatistics />} />
      <Route path="/reviewpage/:id" element={<ReviewMain />} />
      <Route path="/myreview" element={<MyReview />} />
      <Route path="myreviewdetail" element={<MyReviewDetailPage />} />
      <Route path="noticewrite" element={<NoticeWrite />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
