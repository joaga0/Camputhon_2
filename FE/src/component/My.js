import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./My.css";

const My = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("friends"); // 'friends' 또는 'invites'
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🍚"); // 초기 선택 이모지
  const [selectedColor, setSelectedColor] = useState("#4AB817"); // 초기 선택 색상

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const events = [
    {
      id: 1,
      user: "심심이",
      university: "동국대학교",
      title: "게릴라 버스킹 공연",
      description:
        "팔정도에서 2시간동안 버스킹 공연합니다. 많은 관심 부탁드립니다!",
      time: "12:00 - 14:00",
      participants: "1/10",
      status: "accepted",
      emoji: "🎸",
    },
    {
      id: 2,
      user: "유현수",
      university: "동국대학교",
      title: "스터디 할 친구 구해요",
      description: "오늘 2시부터 신공학관 실습실에서 스터디할 친구 구해요",
      time: "14:00 - 16:00",
      participants: "2/5",
      status: "accepted",
      emoji: "✏️",
    },
    {
      id: 3,
      user: "이정빈",
      university: "동국대학교",
      title: "노래방 갈 사람",
      description: "오늘 4시쯤에 노래방 갈 사람",
      time: "16:00 - 18:00",
      participants: "3/4",
      status: "accepted",
      emoji: "🎤",
    },
    {
      id: 4,
      user: "틈틈이",
      university: "동국대학교",
      title: "놀러갈사람",
      description: "오늘 공강 때 마라탕 먹으러 갈 사람",
      time: "12:00 - 14:00",
      participants: "1/5",
      status: "pending",
      emoji: "🍚",
    },
    {
      id: 5,
      user: "틈틈이",
      university: "동국대학교",
      title: "도서관에서 책 읽으실 분",
      description: "오늘 도서관에서 같이 독서할 친구 구해요",
      time: "13:00 - 15:00",
      participants: "1/2",
      status: "declined",
      emoji: "📖",
    },
    // 더 많은 이벤트 데이터를 여기에 추가
  ];

  // 내가 참여한 이벤트와 내가 올린 이벤트를 구분할 배열들
  const participatedEvents = events.filter(
    (event) => event.status === "accepted"
  );
  const uploadedEvents = events.filter(
    (event) => event.status === "pending" || event.status === "declined"
  );

  const friends = [
    {
      id: 1,
      user: "안성원",
      university: "동국대학교",
      profileImg: "/깨비-8.png",
    },
    {
      id: 2,
      user: "김하빈",
      university: "동국대학교",
      profileImg: "/tumtumi.png",
    },
    {
      id: 3,
      user: "이정빈",
      university: "동국대학교",
      profileImg: "/tumtumi.png",
    },
    // 더 많은 친구 데이터를 여기에 추가
  ];

  const invites = [
    {
      id: 6,
      user: "안가영",
      university: "동국대학교",
      profileImg: "/tumtumi.png",
    },
    {
      id: 7,
      user: "최휘윤",
      university: "동국대학교",
      profileImg: "/tumtumi.png",
    },
    // 더 많은 초대장 데이터를 여기에 추가
  ];

  const handleAcceptInvite = (eventId) => {
    // 초대장 수락 처리 로직
    console.log(`Event ${eventId} accepted`);
    // 여기서 이벤트 상태를 업데이트하거나 다른 처리를 수행할 수 있습니다.
  };

  const handleDeclineInvite = (eventId) => {
    // 초대장 거절 처리 로직
    console.log(`Event ${eventId} declined`);
    // 여기서 이벤트 상태를 업데이트하거나 다른 처리를 수행할 수 있습니다.
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  const selectEmoji = (emoji) => {
    setSelectedEmoji(emoji);
    toggleEmojiPicker();
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="my-container">
      <header className="my-header">
        <button className="back-button" onClick={handleBackClick}>
          ←
        </button>
      </header>
      <div id="myprofile" style={{ cursor: "pointer", position: "relative" }}>
        <img src="/Logo.png" alt="프로필" width="40" height="40" />
        <div className="info">
          <strong>틈틈이</strong>
          <span>동국대학교</span>
        </div>
        <button
          className="emoji-button"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: selectedColor,
          }}
          onClick={toggleEmojiPicker}
        >
          {selectedEmoji}
        </button>
        {showEmojiPicker && (
          <div className="emoji-picker">
            {events.map((event) => (
              <button
                key={event.id}
                className="emoji-option"
                onClick={() => selectEmoji(event.emoji)}
              >
                {event.emoji}
              </button>
            ))}
          </div>
        )}
        <div className="color-picker">
          <span
            className="color-option"
            style={{ backgroundColor: "#4AB817" }}
            onClick={() => handleColorSelection("#4AB817")}
          ></span>
          <span
            className="color-option"
            style={{ backgroundColor: "#F0AD00" }}
            onClick={() => handleColorSelection("#F0AD00")}
          ></span>
          <span
            className="color-option"
            style={{ backgroundColor: "#F26767" }}
            onClick={() => handleColorSelection("#F26767")}
          ></span>
          <span
            className="color-option"
            style={{ backgroundColor: "#989898" }}
            onClick={() => handleColorSelection("#989898")}
          ></span>
        </div>
      </div>
      <div className="event-section">
        <h3>내가 참여한 이벤트</h3>
        {participatedEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <img src="/쪼꼬-8.png" alt="프로필" width="40" height="40" />
              <div className="info">
                <strong>{event.user}</strong>
                <br />
                <span>{event.university}</span>
              </div>
              <div className="icon-container">
                <span className="icon-box">
                  <span className="emoji-icon">{event.emoji}</span>
                </span>
              </div>
            </div>
            <div className="event-body">
              <strong>{event.title}</strong>
              <p>{event.description}</p>
            </div>
            <div className="event-footer">
              <span>{event.time}</span>
              <button className="participate-button">
                참여하기 {event.participants}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="event-section">
        <h3>내가 올린 이벤트</h3>
        {uploadedEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <img src="/Logo.png" alt="프로필" width="40" height="40" />
              <div className="info">
                <strong>틈틈이</strong> {/* "틈틈이"로 고정됨 */}
                <br />
                <span>동국대학교</span> {/* "동국대학교"로 고정됨 */}
              </div>
              <div className="icon-container">
                <span className="icon-box">
                  <span className="emoji-icon">{event.emoji}</span>
                </span>
              </div>
            </div>
            <div className="event-body">
              <strong>{event.title}</strong>
              <p>{event.description}</p>
            </div>
            <div className="event-footer">
              <span>{event.time}</span>
              <button className="participate-button">
                참여하기 {event.participants}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "friends" ? "active" : ""}`}
          onClick={() => setActiveTab("friends")}
        >
          친구목록
        </button>
        <button
          className={`tab-button ${activeTab === "invites" ? "active" : ""}`}
          onClick={() => setActiveTab("invites")}
        >
          초대장
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "friends" && (
          <div className="friends-list active">
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <img
                  src={friend.profileImg}
                  alt="프로필"
                  width="40"
                  height="40"
                />
                <div className="info">
                  <strong>{friend.user}</strong>
                  <span>{friend.university}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "invites" && (
          <div className="invites-list active">
            {invites.map((invite) => (
              <div key={invite.id} className="invite-card">
                <div className="invite-info">
                  <img
                    src={invite.profileImg}
                    alt="프로필"
                    width="40"
                    height="40"
                  />
                  <div className="info">
                    <strong>{invite.user}</strong>
                    <span>{invite.university}</span>
                  </div>
                </div>
                <div className="invite-actions">
                  <img
                    src="/circle.png"
                    alt="수락"
                    width="40"
                    height="40"
                    onClick={() => handleAcceptInvite(invite.id)}
                  />
                  <img
                    src="/x.png"
                    alt="거절"
                    width="40"
                    height="40"
                    onClick={() => handleDeclineInvite(invite.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default My;
