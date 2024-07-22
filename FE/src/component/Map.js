import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Map.css';

const friends = [
  { id: 1, lat: 37.567, lng: 126.9784 },
  { id: 2, lat: 37.568, lng: 126.9795 },
  { id: 3, lat: 37.557, lng: 126.9884 },
  { id: 4, lat: 37.558, lng: 126.9995 },
  { id: 5, lat: 37.558, lng: 126.9989 },
  { id: 6, lat: 37.560, lng: 126.9989 },
  { id: 7, lat: 37.556, lng: 127.0007 },
  { id: 8, lat: 37.558, lng: 127.0010 },
  // 다른 친구들의 위치 데이터를 여기에 추가합니다.
];

const fixedIcons = [
  { id: 1, icon: '🍚', lat: 37.565, lng: 126.9784 },
  { id: 2, icon: '✏️', lat: 37.558, lng: 126.9884 },
  { id: 3, icon: '☕', lat: 37.558, lng: 126.9810 },
  { id: 4, icon: '🎤', lat: 37.564, lng: 126.9920 },
  { id: 5, icon: '📖', lat: 37.559, lng: 126.9989 },
  { id: 6, icon: '☕', lat: 37.560, lng: 126.9986 },
  { id: 7, icon: '🎸', lat: 37.5565, lng: 127.0007 },
  { id: 8, icon: '🍚', lat: 37.558, lng: 127.0010 },
  { id: 9, icon: '✏️', lat: 37.564, lng: 126.9820 },
  { id: 10, icon: '☕', lat: 37.564, lng: 126.9820 },
  { id: 11, icon: '🍚', lat: 37.559, lng: 127.0011 },
];

const Map = () => {
  const [position, setPosition] = useState({ lat: 37.5665, lng: 126.9780 });
  const [map, setMap] = useState(null);
  const [friendMarkers, setFriendMarkers] = useState([]);
  const [showFriends, setShowFriends] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [finalPopup, setFinalPopup] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState(null); // 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
    });

    const watchId = navigator.geolocation.watchPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setPosition({ lat: latitude, lng: longitude });
    });

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=32abb7182bc1f4277170596b604d3a11&autoload=false';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(position.lat, position.lng),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);

        const markerImageSrcme = '/Logo.png'; // 내 위치 마커 이미지 URL
        const imageSizeme = new window.kakao.maps.Size(30, 30); // 내 위치 마커 이미지 크기 조정
        const markerImageme = new window.kakao.maps.MarkerImage(markerImageSrcme, imageSizeme);

        const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);
        new window.kakao.maps.Marker({
          position: markerPosition,
          map: mapInstance,
          image: markerImageme,
        });

        // 필터링된 아이콘 렌더링
        const filteredIcons = selectedKeyword
          ? fixedIcons.filter(icon => icon.icon === selectedKeyword)
          : fixedIcons;

        filteredIcons.forEach(iconData => {
          const iconPosition = new window.kakao.maps.LatLng(iconData.lat, iconData.lng);
          const iconContent = document.createElement('div');
          iconContent.className = 'icon-marker white-box';
          iconContent.innerText = iconData.icon;
          iconContent.onclick = () => handleIconClick(iconData.icon);

          new window.kakao.maps.CustomOverlay({
            map: mapInstance,
            position: iconPosition,
            content: iconContent,
            yAnchor: 1,
            xAnchor: 0.5,
          });
        });

        window.kakao.maps.event.addListener(mapInstance, 'idle', () => {
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(position.lat, position.lng),
            map: mapInstance,
            image: markerImageme,
          });
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [position, selectedKeyword]); // selectedKeyword를 의존성 배열에 추가

  useEffect(() => {
    // 페이지 전환 시 스크롤 활성화
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Map 컴포넌트를 떠날 때 스크롤 비활성화 해제
    };
  }, []);

  const handleProfileClick = () => {
    navigate('/my'); // 마이페이지로 이동하는 URL을 설정합니다.
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleEmojiClick1 = () => {
    // 친구들의 위치에 마커 추가 및 제거
    if (map) {
      if (showFriends) {
        friendMarkers.forEach(marker => marker.setMap(null)); // 마커 제거
        setFriendMarkers([]);
      } else {
        const markerImageSrcFriend = '/쪼꼬-8.png'; // 친구들 마커 이미지 URL
        const imageSizeFriend = new window.kakao.maps.Size(20, 30); // 친구들 마커 이미지 크기 조정
        const markerImageFriend = new window.kakao.maps.MarkerImage(markerImageSrcFriend, imageSizeFriend);

        const markers = friends.map(friend => {
          const friendPosition = new window.kakao.maps.LatLng(friend.lat, friend.lng);
          const marker = new window.kakao.maps.Marker({
            position: friendPosition,
            map: map,
            image: markerImageFriend, // 친구들의 마커 이미지 설정
          });
          return marker;
        });
        setFriendMarkers(markers);
      }
      setShowFriends(!showFriends);
    }
  };

  const handleIconClick = (icon) => {
    setPopupContent({
      user: "심심이님",
      university: "동국대학교",
      title: "게릴라 버스킹 공연",
      description: "팔정도에서 2시간동안 버스킹 공연합니다. 많은 관심 부탁드립니다!",
      time: "12:00 - 14:00",
      icon: icon
    });
  };

  const handleParticipateClick = () => {
    setConfirmPopup(true);
  };

  const handleConfirmClick = () => {
    setConfirmPopup(false);
    setFinalPopup(true);
    setTimeout(() => {
      setFinalPopup(false);
      setPopupContent(null);
    }, 800);
  };

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
  };

  return (
    <div id="map-container">
      <div id="profile" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
        <img src="/Logo.png" alt="" width="40" height="40" />
        <div className="info">
          <strong>틈틈이님</strong>
          <span>동국대학교</span>
        </div>
        <button
          className="emoji-button"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "#4AB817",
          }}
        >
            🍚
        </button>
      </div>
      <div id="keywords">
      <button onClick={() => setSelectedKeyword(null)}>전체</button> {/* 전체 보기 버튼 추가 */}
        <button onClick={() => handleKeywordClick('☕')}>☕카페</button>
        <button onClick={() => handleKeywordClick('📖')}>📖독서</button>
        <button onClick={() => handleKeywordClick('🍚')}>🍚식사</button>
        <button onClick={() => handleKeywordClick('🎸')}>🎸공연</button>
        
      </div>
      <div id="map"></div>
      <button
        className="spot-register-button"
        onClick={() => handleNavigate("/register")}
      >
        + 스팟 등록하기
      </button>
      <div id="emoji-container">
        <button className="emoji-button" onClick={handleEmojiClick1}>📍</button>
      </div>
      {popupContent && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setPopupContent(null)}>&times;</span>
            <div className="popup-header">
              <img src="/Logo.png" alt="프로필" className="popup-profile-img" />
              <div className="popup-info">
                <strong>{popupContent.user}</strong>
                <span>{popupContent.university}</span>
              </div>
              <div className="popup-icon">{popupContent.icon}</div>
            </div>
            <div className="popup-body">
              <strong>{popupContent.title}</strong>
              <p>{popupContent.description}</p>
            </div>
            <div className="popup-footer">
              <span>{popupContent.time}</span>
              <button className="participate-button" onClick={handleParticipateClick}>
                참여하기
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>정말 이벤트에 참여하시겠습니까?</p>
            <p>참여 신청 후 취소는 불가하며 무단 불참 시 불이익이 적용됩니다. (참여자 제한 없음)</p>
            <div className="confirm-buttons">
              <button className="confirm-button" onClick={handleConfirmClick}>확인</button>
              <button className="cancel-button" onClick={() => setConfirmPopup(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
      {finalPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>신청이 완료되었습니다.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
