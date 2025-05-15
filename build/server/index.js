import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, useNavigate, Outlet, useNavigation, Meta, Links, ScrollRestoration, Scripts, Link, useLoaderData, useSearchParams, useLocation } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useContext, createContext, useState, useEffect, useRef } from "react";
import CryptoJS from "crypto-js";
import AOS from "aos";
import NProgress from "nprogress";
import { MdEditSquare, MdLocationPin, MdPhone, MdOutline3gMobiledata, MdEmail, MdOutlineCancel, MdArrowBack, MdArrowForward, MdDashboard, MdSupervisedUserCircle, MdShoppingBag, MdOutlineSettings, MdLock, MdCable, MdPrivacyTip, MdHelpCenter, MdSecurity, MdError } from "react-icons/md";
import { FaSpinner, FaUserCircle, FaSearch, FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaCheck } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight, BiSolidRightArrow, BiEditAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomRight, HiAdjustmentsHorizontal } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import { BsStarFill, BsStar, BsArrowReturnRight, BsBank, BsArrowRight } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiArrowRight } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useNavigate as useNavigate$1, useLoaderData as useLoaderData$1 } from "react-router";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};
function DoResponse(json, code = 500) {
  return new Response(
    JSON.stringify(json),
    {
      status: code,
      headers
    }
  );
}
function GetResponse(data, success = false, code = 200) {
  const response = {
    success,
    rspcode: code,
    data
  };
  return new Response(
    JSON.stringify(response),
    {
      status: code,
      headers
    }
  );
}
const HashPwd = (input) => {
  return CryptoJS.SHA256(input).toString();
};
const GenerateRandomHash = () => {
  const randomBytes = CryptoJS.lib.WordArray.random(16);
  const hash = CryptoJS.SHA256(randomBytes).toString();
  return hash;
};
const getQuery$1 = async (criteria) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/listings/" + criteria;
  const url = BASE_URL + endpoint;
  console.log(url);
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCountries = async () => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/util/country";
  const url = BASE_URL + endpoint;
  console.log(url);
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const finaldata = data.map((country) => {
      return {
        name: country.name,
        id: country.id
      };
    });
    console.log(finaldata);
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getStates = async (countryCode) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/util/state?country_code=" + countryCode;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCities = async (countryCode, stateCode) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/util/city?country_code=" + countryCode + "&state_code=" + stateCode;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getCategories = async () => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/util/category";
  const url = BASE_URL + endpoint;
  console.log(url);
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfile = async (guid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/users/" + guid;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const changeEmail = async (guid, email) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/users/change_email?guid=${guid}&email=${email}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "PUT",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = {
      status: true
    };
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserProfileImageData = async (guid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/users/user_profile_image/" + guid;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessProfileImageData = async (guid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/listings/business_profile_image/" + guid;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getGallery = async (businessGuid, userGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/gallery/${businessGuid}/${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getOperatingHours = async (businessGuid, userGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    console.log(error.message);
    return void 0;
  }
};
const saveOperatingHours = async (openStatus, workingHours, businessGuid, userGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/operating_hours?business_guid=${businessGuid}&user_guid=${userGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify({ openStatus, workingHours })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSysFacilityFeatures = async () => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/sys_facility_features`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getSelectedFacilityFeatures = async (userGuid, businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/selected_facility_features/${userGuid}/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusiness = async (userGuid, businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/activate/${userGuid}/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessGallery = async (businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/business_gallery/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getRating = async (userGuid, businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/rating/${userGuid}/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessFeatures = async (businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/business_facility_features/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getBusinessRatings = async (businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/rating/business_ratings/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getLocalDate = (date) => {
  const localDate = new Date(date);
  const formatted = localDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  return formatted;
};
const getRatingsReviews = async (businessGuid) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/rating/ratings_reviews/${businessGuid}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getListingByCategory = async (category, limit) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/listing_by_category/${category}/${limit}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getFeaturedListing = async () => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/listings/featured_listing`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const getUserByUserHash = async (userHash) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = `/api/users/user_by_user_hash/${userHash}`;
  const url = BASE_URL + endpoint;
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const generate7DigitNumber = () => {
  return Math.floor(1e6 + Math.random() * 9e6);
};
function toSentenceCase(text) {
  return text.toLowerCase().replace(
    /([^.!?]*[.!?])(\s+|$)/g,
    (match) => match.charAt(0).toUpperCase() + match.slice(1)
  );
}
const AuthContext = createContext(null);
const SITE_BASE_URL$1 = "https://gursse.com";
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
function AuthProvider({ children }) {
  let [authTokens, setAuthTokens] = useState(null);
  let [user, setUser] = useState(null);
  const verifyToken = async (accessToken) => {
    try {
      let verifyep = "/api/users/verifytoken";
      let vep = SITE_BASE_URL$1 + verifyep;
      const response = await fetch(vep, {
        method: "POST",
        headers,
        body: JSON.stringify({ "token": accessToken })
      });
      if (response.status !== 200) {
        throw new Error("Could not obtain token");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
      return null;
    }
  };
  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens !== null) {
      const authTokens2 = JSON.parse(tokens);
      setAuthTokens(authTokens2);
    } else {
      setAuthTokens(null);
    }
    if (tokens) {
      const authTokens2 = JSON.parse(tokens);
      const accessToken = authTokens2.accessToken;
      verifyToken(accessToken).then((data) => {
        if (data === null) {
          setAuthTokens(null);
          setUser(null);
          localStorage.removeItem("authTokens");
        } else {
          setUser(data);
        }
      });
    } else {
      setUser(null);
    }
    setLoading(false);
    let timeoutDuration = 1e3 * 60 * 60 * 12;
    let interval = setInterval(() => {
      signout();
    }, timeoutDuration);
    return () => clearInterval(interval);
  }, []);
  let [loading, setLoading] = useState(true);
  const baseurl = SITE_BASE_URL$1;
  const endpoint = "/api/users/signin";
  const requesturl = baseurl + endpoint;
  useNavigate();
  let signin = async (data) => {
    try {
      const response = await fetch(requesturl, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      let tokens = await response.json();
      if (response.status === 200) {
        setAuthTokens(tokens);
        {
        }
        verifyToken(tokens.accessToken).then((data2) => {
          setUser(data2);
        });
        localStorage.setItem("authTokens", JSON.stringify(tokens));
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
          }, 100);
        });
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(tokens);
          }, 100);
        });
      }
    } catch (error) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(false);
        }, 100);
      });
    }
  };
  const signout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    window.location.reload();
  };
  const resetpw2 = async (data) => {
    const BASE_URL = "https://gursse.com";
    const endpoint2 = "/api/users/reset_password_request";
    const url = BASE_URL + endpoint2;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      var respObj = await response.json();
      if (!response.ok) {
        throw new Error(`Error Code: ${response.status} - ${respObj.message}`);
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(respObj.message);
          }, 100);
        });
      }
    } catch (e) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(e.message);
        }, 100);
      });
    } finally {
    }
  };
  let cdata = {
    user,
    signin,
    signout,
    resetpw: resetpw2
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value: cdata, children });
}
const AOSContext = React.createContext(null);
function AOSProvider({ children }) {
  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1e3,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom"
      });
    };
    initAOS();
  }, []);
  let val = null;
  return /* @__PURE__ */ jsx(AOSContext.Provider, { value: val, children });
}
const NotificationContext = createContext(null);
function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
const NotificationProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState(0);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmOk, setConfirmOk] = useState(false);
  const [onCloseConfirm, setOnCloseConfirm] = useState();
  const handleClose = () => {
    setShow(false);
  };
  const cancel = () => {
    setShow(false);
    setType(0);
    setMessage("");
  };
  useEffect(() => {
    cancel();
  }, []);
  const notify = async (message2 = "Working...") => {
    cancel();
    setNotifyMessage(message2);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(1);
  };
  const alert2 = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(2);
  };
  const alertCancel = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(5);
  };
  const alertReload = async (title2, message2) => {
    cancel();
    setMessage(message2 || "Completed!");
    setTitle(title2 || "Alert");
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(3);
  };
  const confirm = async (message2 = "Do you wish to continue?", onClose) => {
    cancel();
    setMessage(message2);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShow(true);
    setType(4);
    setOnCloseConfirm(() => onClose);
  };
  let vals = {
    notify,
    cancel,
    alert: alert2,
    alertReload,
    confirm,
    confirmCancel,
    confirmOk,
    alertCancel
  };
  return /* @__PURE__ */ jsxs(NotificationContext.Provider, { value: vals, children: [
    show && type === 1 && /* @__PURE__ */ jsx(
      Notify,
      {
        working: show,
        notifyMessage
      }
    ),
    show && type === 2 && /* @__PURE__ */ jsx(
      Alert,
      {
        handleClose,
        working: show,
        message,
        title
      }
    ),
    show && type === 3 && /* @__PURE__ */ jsx(
      AlertReload,
      {
        handleClose,
        working: show,
        title,
        message
      }
    ),
    show && type === 4 && /* @__PURE__ */ jsx(
      Confirm,
      {
        onClose: onCloseConfirm,
        working: show,
        message
      }
    ),
    show && type === 5 && /* @__PURE__ */ jsx(
      AlertCancel,
      {
        handleClose,
        working: show,
        message,
        title
      }
    ),
    children
  ] });
};
const Confirm = ({ handleClose, working, message, handleConfirmCancel, setConfirmOk, onClose }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`, children: "Confirm" }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(false),
          className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => onClose(true),
          className: `px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`,
          children: "Continue"
        }
      )
    ] })
  ] }) });
};
const Notify = ({ working, notifyMessage }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`, children: "Processing..." }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsxs("div", { className: ` px-3 py-3 h-fit
                        flex place-items-center gap-2`, children: [
      /* @__PURE__ */ jsx(FaSpinner, { className: `text-3xl text-blue-500 ${working ? "animate-spin" : ""}` }),
      notifyMessage
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: " " })
  ] }) });
};
const Alert = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsxs("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: handleClose,
          className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
          children: "Close"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onMouseDown: () => window.location.reload(),
          className: `px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,
          children: "Reload"
        }
      )
    ] })
  ] }) });
};
const AlertReload = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: () => window.location.reload(),
        className: `px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,
        children: "Reload"
      }
    ) })
  ] }) });
};
const AlertCancel = ({ handleClose, working, message, title }) => {
  return /* @__PURE__ */ jsx("div", { className: `z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/10 flex flex-col place-content-center place-items-center
                `, children: /* @__PURE__ */ jsxs("div", { className: `w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`, children: [
    /* @__PURE__ */ jsx("div", { className: `px-4 py-3 border-b-[1px] font-bold text-[17px] bg-yellow-300
                            w-full`, children: title }),
    /* @__PURE__ */ jsx("div", { className: `w-full h-auto 
                            `, children: /* @__PURE__ */ jsx("div", { className: ` px-4 py-3 h-fit`, children: message }) }),
    /* @__PURE__ */ jsx("div", { className: `px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleClose,
        className: `px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,
        children: "Close"
      }
    ) })
  ] }) });
};
const EditPhotoDialogContext = createContext(null);
function useEditPhotoDialogContext() {
  const context = useContext(EditPhotoDialogContext);
  if (!context) {
    throw new Error("useEditPhotoDialogContext must be used within an AuthProvider");
  }
  return context;
}
function EditPhotoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState(null);
  const [imageGuid, setImageGuid] = useState(null);
  const [formData, setFormdata] = useState(null);
  const fileInputRef = useRef(null);
  const notification = useNotification();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
    setWorking(false);
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpdate = async () => {
    notification.notify();
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let imageTitle2 = document.getElementById("image_title");
    const formData2 = new FormData();
    if (isImgSelected) {
      formData2.append("file", selectedFile);
    }
    formData2.append("guid", userGuid);
    formData2.append("bid", businessGuid);
    formData2.append("image_title", imageTitle2.value);
    formData2.append("image_guid", imageGuid);
    const IMG_BASE_URL2 = "https://oxbyt.com";
    const endpoint = "/business_gallery_pic_update";
    const url = IMG_BASE_URL2 + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        },
        body: formData2
      });
      if (!response.ok) {
        let error = response.json().then((data) => {
          notification.alert("", data.message);
        });
      } else {
        notification.alert("Image Update", "Image updated successfully!");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const deletePhoto = async (userGuid2, businessGuid2, imageGuid2) => {
    const IMG_BASE_URL2 = "https://oxbyt.com";
    const endpoint = `/delete_business_gallery_pic`;
    const url = IMG_BASE_URL2 + endpoint;
    const data = {
      guid: userGuid2,
      bid: businessGuid2,
      image_guid: imageGuid2
    };
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          notification.alert(data2.message);
        });
      } else {
        notification.alertReload("", "Image deleted successfully!");
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    handleCloseDialog,
    imgSrc,
    setImgSrc,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile,
    imageTitle,
    setImageTitle,
    imageGuid,
    setImageGuid,
    deletePhoto
  };
  return /* @__PURE__ */ jsxs(EditPhotoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen bg-black/30 z-[3000]`, children: /* @__PURE__ */ jsx("div", { className: `fixed w-screen h-screen z-[3000] 
                 top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`, children: /* @__PURE__ */ jsx(
      "div",
      {
        className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3100] `,
        children: /* @__PURE__ */ jsxs("div", { className: `w-full h-full overflow-y-auto`, children: [
          /* @__PURE__ */ jsxs("div", { className: `relative w-full h-[75%] bg-black`, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-scale-down w-full h-full`
              }
            ),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                ref: fileInputRef,
                className: "hidden",
                onChange: handleFileChange
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `flex place-content-center place-items-center
                                                                     bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                                                     text-white/80 `,
                onMouseDown: handleImageClick,
                children: /* @__PURE__ */ jsx("div", { className: `w-[60px] h-[60px] flex flex-col
                                        place-content-center place-items-center bg-white/50
                                        hover:cursor-pointer hover:bg-white/50
                                        rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `h-[25%]`, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                onChange: (e) => setImageTitle(e.target.value),
                id: "image_title",
                value: imageTitle,
                placeholder: `Enter picture description.`,
                type: "text",
                className: `w-full bg-gray-100 px-3  h-[60px]`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onMouseDown: () => handleCloseDialog(),
                  className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleUpdate(),
                  className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                  children: working ? "Working..." : "Submit"
                }
              )
            ] })
          ] })
        ] })
      }
    ) }) }),
    children
  ] });
}
const AddPhotoDialogContext = createContext(null);
function useAddPhotoDialogContext() {
  const context = useContext(AddPhotoDialogContext);
  if (!context) {
    throw new Error("useAddPhotoDialogContext must be used within an AuthProvider");
  }
  return context;
}
function AddPhotoDialogProvider({ children }) {
  const [working, setWorking] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [userGuid, setUserGuid] = useState(null);
  const [businessGuid, setBusinessGuid] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const notification = useNotification();
  const handleCloseDialog = () => {
    setDialog(false);
    setImgSrc(null);
  };
  const handleUpload = async () => {
    setWorking(true);
    let imageTitle = document.getElementById("image_title");
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", userGuid);
      formData.append("bid", businessGuid);
      formData.append("image_title", imageTitle.value);
      notification.notify();
      await new Promise((resolve) => setTimeout(resolve, 2e3));
      const IMG_BASE_URL2 = "https://oxbyt.com";
      const endpoint = "/business_gallery_pic_upload";
      const url = IMG_BASE_URL2 + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            notification.alert("", data.message);
          });
        } else {
          notification.alertReload("", "Image uploaded successfully!");
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      alert("Please select an image to continue.");
      setWorking(false);
    }
  };
  let vals = {
    dialog,
    setDialog,
    imgSrc,
    setImgSrc,
    handleCloseDialog,
    userGuid,
    setUserGuid,
    businessGuid,
    setBusinessGuid,
    isImgSelected,
    setIsImageSelected,
    selectedFile,
    setSelectedFile
  };
  return /* @__PURE__ */ jsxs(AddPhotoDialogContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx(
      "div",
      {
        className: `flex w-screen h-screen z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 bg-black/30
                place-content-center place-items-center`,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: `relative w-[90%] h-[80%] bg-white 
                        rounded-[8px] overflow-hidden z-[3000]`,
            onClick: (event) => {
              event.preventDefault();
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: `relative w-full h-[75%] bg-black`, children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: imgSrc,
                  alt: "",
                  className: `object-scale-down w-full h-full`
                }
              ) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                "input",
                {
                  id: "image_title",
                  placeholder: `Enter picture description.`,
                  type: "text",
                  className: `w-full bg-gray-100 px-3  h-[60px]`
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: `flex place-content-end px-3 gap-2`, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onMouseDown: () => handleCloseDialog(),
                    className: `bg-gray-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleUpload(),
                    className: `bg-blue-800 text-white px-3 py-1.5 rounded-md
                                    shadow-md mb-2 mt-4`,
                    children: working ? "Working..." : "Submit"
                  }
                )
              ] })
            ]
          }
        )
      }
    ),
    children
  ] });
}
const SliderContext = createContext(null);
function useSliderContext() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("useSliderContext must be used within a SliderProvider");
  }
  return context;
}
const IMG_BASE_URL = "https://oxbyt.com";
const SliderProvider = ({ children }) => {
  const [dialog, setDialog] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [slides, setGallery] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [listing, setListing] = useState(null);
  useRef(0);
  useRef(0);
  const handleClose = () => {
    setDialog(false);
  };
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  let vals = {
    dialog,
    setDialog,
    selectedSlide,
    setSelectedSlide,
    slides,
    setGallery,
    setListing
  };
  return /* @__PURE__ */ jsxs(SliderContext.Provider, { value: vals, children: [
    dialog && /* @__PURE__ */ jsx("div", { className: `flex w-screen h-screen bg-white z-[5000] 
                fixed top-0 left-0 right-0 bottom-0 `, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
      /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
        /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides && selectedSlide && slides.map((slide, index2) => {
          return /* @__PURE__ */ jsx(
            "img",
            {
              src: IMG_BASE_URL + slide.image_url,
              alt: "",
              style: { transform: `translateX(-${currentSlide * 100}%)` },
              className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
            },
            index2
          );
        }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                                                p-[1rem] cursor-pointer left-0 group h-full 
                                                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                                                    p-[1rem] cursor-pointer right-0 group 
                                                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                                                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: () => handleClose(),
            className: `w-[50px] h-[50px] z-[300] bg-white
                                                    flex place-content-center place-items-center
                                                    rounded-full absolute left-2 top-2 cursor-pointer
                                                    hover:bg-white/40 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
        /* @__PURE__ */ jsxs("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: [
          "Photos for ",
          listing && listing.title
        ] }),
        /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
          currentSlide + 1,
          " / ",
          slides.length
        ] }),
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
      ] })
    ] }) }),
    children
  ] });
};
if (typeof document === "undefined") {
  React.useLayoutEffect = React.useEffect;
}
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  const navigation = useNavigation();
  useEffect(() => {
    NProgress.start();
    if (navigation) {
      if (navigation.state !== "loading") {
        NProgress.done();
      }
    }
  }, [navigation]);
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(NotificationProvider, { children: /* @__PURE__ */ jsx(SliderProvider, { children: /* @__PURE__ */ jsx(EditPhotoDialogProvider, { children: /* @__PURE__ */ jsx(AddPhotoDialogProvider, { children: /* @__PURE__ */ jsx(AOSProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children }) }) }) }) }) }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const Logo = ({ theme }) => {
  const [navTheme, setNavTheme] = useState("lite");
  useEffect(() => {
    setNavTheme(theme);
  }, [theme]);
  return /* @__PURE__ */ jsxs("div", { className: "flex place-items-center space-x-1 relative", children: [
    /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("div", { className: `${theme === "light" ? "bg-black text-white" : "bg-white/90 text-black"} 
            md:w-9 md:h-9 w-8 h-8 rounded-full relative overflow-hidden
            flex place-content-center place-items-center flex-col`, children: /* @__PURE__ */ jsx(
      "img",
      {
        src: "images/comcerc-logo.png",
        alt: "comcerc",
        className: `object-cover w-full h-full`
      }
    ) }) }),
    /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx("h1", { className: `${theme === "light" ? "text-black" : "text-white/90"} 
            font-[700] text-2xl sm:text-2xl md:text-3xl tracking-tight relative top-[-1px]
            first-letter: font-sans first-letter: `, children: "comcerc" }) })
  ] });
};
const RequestType = {
  PASSWORD_RESET: "password_reset",
  CHANGE_PASSWORD: "change_password",
  CHANGE_EMAIL: "change_email"
};
const RequestStatus = {
  OPEN: "open",
  CLOSED: "closed"
};
const navlinks = [
  {
    id: 1,
    url: "/",
    label: "Home"
  },
  {
    id: 2,
    url: "/search",
    label: "Search"
  },
  {
    id: 3,
    url: "/search?q=hotels",
    label: "Hotels"
  },
  {
    id: 4,
    url: "/search?q=travel",
    label: "Travel"
  },
  {
    id: 5,
    url: `/search?q=real estate`,
    label: "Real Estate"
  },
  {
    id: 6,
    url: "/search?q=services",
    label: "Services"
  }
];
const UserMenu = ({ user, signout, navBg }) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(true);
  };
  const handleHideMenu = () => {
    setShowMenu(false);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col relative ", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: `${navBg ? "text-black" : "text-black"}  relative
                    hover:bg-white pl-[5px] pr-[15px] py-[2px] bg-yellow-300 rounded-full
                    transition-all duration-200 cursor-pointer`,
        onFocus: handleShowMenu,
        onBlur: () => {
          setTimeout(() => {
            handleHideMenu();
          }, 300);
        },
        children: /* @__PURE__ */ jsxs("div", { className: `flex items-center space-x-2 max-w-[200px] truncate`, children: [
          /* @__PURE__ */ jsx(FaUserCircle, { className: " w-5 h-5" }),
          /* @__PURE__ */ jsxs("p", { className: "font-normal  text-base truncate", children: [
            "Welcome ",
            user.first_name
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `absolute top-8 h-auto py-3 z-500 shadow-2xl
                    bg-yellow-200 rounded-[8px] w-full px-1 transition-opacity ease-in-out duration-800
                    space-y-1 ${showMenu ? "opacity-100 block" : "opacity-0 hidden"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: " hover:bg-yellow-400/50 px-2 py-1 rounded-[5px]", children: /* @__PURE__ */ jsx(Link, { to: "/account", children: /* @__PURE__ */ jsx("p", { children: "Account" }) }) }),
          /* @__PURE__ */ jsx("div", { className: " hover:bg-yellow-400/50 px-2 py-1 rounded-[5px]", children: /* @__PURE__ */ jsx(Link, { to: "#", onClick: () => {
            setTimeout(() => {
              signout();
              handleHideMenu();
            }, 300);
          }, children: /* @__PURE__ */ jsx("p", { children: "Signout" }) }) })
        ]
      }
    )
  ] }) });
};
const SigninLink = ({ user, signout, navBg }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `${navBg ? "text-black" : "text-black"} flex 
                    items-center space-x-2 border-b-transparent border-b relative
                    hover:bg-white px-2 py-[2px] bg-yellow-300 rounded-full
                    transition-all duration-200`, children: [
    /* @__PURE__ */ jsx(FaUserCircle, { className: " w-5 h-5" }),
    /* @__PURE__ */ jsx(Link, { to: "/signin", children: /* @__PURE__ */ jsx("p", { className: "font-bold text-xs sm:text-base", children: "Login / Register" }) })
  ] }) });
};
const Nav$2 = ({ openNav }) => {
  const [navBg, setNavBg] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(1);
  const { user, signout } = useAuth();
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setNavBg(true);
      }
      if (window.scrollY < scrollHeight) {
        setNavBg(false);
      }
    };
    window.onscroll = () => handler();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `fixed ${navBg ? "bg-yellow-300" : "bg-yellow-300"} h-[72px] z-[300] w-full transition-all ease-in-out duration-100 `, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto", children: [
    /* @__PURE__ */ jsx(Logo, { theme: "light" }),
    /* @__PURE__ */ jsx("div", { className: ` lg:flex items-center space-x-14  hidden`, children: navlinks.map((navlink) => {
      return /* @__PURE__ */ jsx(Link, { to: navlink.url, children: /* @__PURE__ */ jsx("p", { className: `${navBg ? "text-black" : "text-black"} font-bold tracking-tighter text-[14px]  font-sans hover:text-black/40`, children: navlink.label }) }, navlink.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: " flex items-center space-x-4", children: [
      user ? /* @__PURE__ */ jsx(UserMenu, { user, signout, navBg }) : /* @__PURE__ */ jsx(SigninLink, {}),
      /* @__PURE__ */ jsx(HiBars3BottomRight, { onClick: openNav, className: `${navBg ? "text-black" : "text-black"} w-8 h-8 cursor-pointer ` })
    ] })
  ] }) });
};
const MobileNav = ({ showNav, closeNav }) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { onClick: closeNav, className: `transform ${navOpen} fixed transition-all duration-500 inset-0 z-[4000] bg-black opacity-70 w-full` }),
    /* @__PURE__ */ jsxs("div", { className: `text-white ${navOpen} transform transition-all duration-500 delay-300 fixed flex justify-center flex-col h-full w-[80%] sm:w-[60%] bg-[#000]/60 space-y-6 z-[10000]`, children: [
      navlinks == null ? void 0 : navlinks.map((navlink) => {
        return /* @__PURE__ */ jsx("a", { href: navlink.url, children: /* @__PURE__ */ jsx("p", { className: "text-[20px] ml-12 border-b-[1.5px] pb-1 w-fit border-white sm:text-[30px] font-medium hover:text-yellow-300", children: navlink.label }) }, navlink.id);
      }),
      /* @__PURE__ */ jsx(
        CgClose,
        {
          onClick: closeNav,
          className: "absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 text-white cursor-pointer"
        }
      )
    ] })
  ] });
};
const ResponsiveNav$2 = () => {
  const [showNav, setShowNav] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Nav$2, { openNav }),
    /* @__PURE__ */ jsx(MobileNav, { showNav, closeNav })
  ] });
};
const SearchBox = ({ query: query2 }) => {
  const [queryParam, setQueryParam] = useState("");
  const [formdata, setFormdata] = useState(null);
  const changeHandler = (e) => {
    setQueryParam(e.target.value);
  };
  useEffect(() => {
    if (query2 !== null && query2 !== void 0) {
      setQueryParam(query2);
    }
  }, [query2]);
  return /* @__PURE__ */ jsx("form", { action: "/search", method: "get", children: /* @__PURE__ */ jsx("div", { className: " w-full md:w-[80%] mx-auto bg-white h-[4rem] sm:h-[5rem] flex px-4 sm:px-8 flex-col justify-center rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: " flex items-center justify-between h-full", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        name: "q",
        value: queryParam,
        onChange: (e) => changeHandler(e),
        type: "text",
        placeholder: "Enter an address ,city or ZIP to buy",
        className: "sm:flex-[0.85] h-[60%] bg-gray-100 flex grow rounded-lg outline-none px-4 placeholder:text-sm"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center ml-4 flex-[0.15] space-x-6 place-content-end", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:flex hidden  items-center cursor-pointer space-x-2", children: /* @__PURE__ */ jsx(HiAdjustmentsHorizontal, { className: " text-gray-700 w-6 h-6" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-12 h-12 bg-rose-600 items-center hover:bg-rose-800 transition-all duration-150 flex cursor-pointer justify-center text-white rounded-full",
          children: /* @__PURE__ */ jsx(FaSearch, {})
        }
      )
    ] })
  ] }) }) });
};
const SearchHeader = ({ query: query2 }) => {
  return /* @__PURE__ */ jsx("div", { className: " bg-yellow-400 pt-24 pb-16", children: /* @__PURE__ */ jsxs("div", { className: " flex h-full justify-center items-center flex-col w-[95%] sm:w-[80%] mx-auto relative z-10", children: [
    /* @__PURE__ */ jsx("div", { className: " text-black font-bold relative top-4 text-2xl text-center flex flex-col leading-[1.3em] w-[90%] md:w-full place-items-center place-content-center", children: "Discover. Connect. Grow." }),
    /* @__PURE__ */ jsx(
      "div",
      {
        "data-aos": "zoom-out",
        "data-aos-delay": "100",
        className: "mt-12 w-full",
        children: /* @__PURE__ */ jsx(SearchBox, { query: query2 })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: " text-black font-normal relative top-4 text-[12px] text-center flex flex-col leading-[1.3em] w-[90%] md:w-full place-items-center place-content-center", children: "Get to know and visit the best of local businesses across the globe. Smartest way to find and be found." })
  ] }) });
};
const PreFooter = () => {
  return /* @__PURE__ */ jsx("div", { className: " h-20" });
};
const discover = [
  {
    title: "New York"
  },
  {
    title: "London"
  },
  {
    title: "Dubai"
  },
  {
    title: "Chicago"
  },
  {
    title: "Brussels"
  },
  {
    title: "Germany"
  },
  {
    title: "Abu Dhabi"
  }
];
const Footer = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(PreFooter, {}),
    /* @__PURE__ */ jsxs("div", { className: " pt-20 pb-12 bg-black", children: [
      /* @__PURE__ */ jsxs("div", { className: " w-[80%] mx-auto grid items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-8 border-b-[1.5px] border-white/20", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
          /* @__PURE__ */ jsx("p", { className: " text-sm font-extralight text-white/80  mt-6", children: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos modi praesentium, quo deleniti dolorum voluptatem molestias nemo nihil amet non quas!" }),
          /* @__PURE__ */ jsx("p", { className: " text-gray-300/60 mt-4 font-light", children: "example@email.com" }),
          /* @__PURE__ */ jsx("p", { className: " text-gray-300/50 mt-2 font-light", children: "+123 456 7890" }),
          /* @__PURE__ */ jsxs("div", { className: " flex items-center space-x-4 mt-6", children: [
            /* @__PURE__ */ jsx(FaFacebookF, { className: "w-6 h-6 text-gray-500" }),
            /* @__PURE__ */ jsx(FaTwitter, { className: "w-6 h-6 text-gray-500" }),
            /* @__PURE__ */ jsx(FaYoutube, { className: "w-8 h-6 text-gray-500" }),
            /* @__PURE__ */ jsx(FaInstagram, { className: "w-6 h-6 text-gray-500" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:mx-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "footer__heading", children: "Popular" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Apartment for rent" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Apartment Low to High" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Offices for Buy" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Offices for Rent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:mx-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "footer__heading", children: "Quick Links" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Terms of use" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Privacy Policy" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Pricing Plan" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Our Services" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Contact Support" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "Careers" }),
          /* @__PURE__ */ jsx("p", { className: "footer__link", children: "FAQ" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:mx-auto", children: [
          /* @__PURE__ */ jsx("h1", { className: "footer__heading", children: "Discover" }),
          discover.map((place, index2) => {
            return /* @__PURE__ */ jsx("p", { className: "footer__link", children: /* @__PURE__ */ jsx(Link, { to: `/search?q=${place == null ? void 0 : place.title.toLowerCase()}`, children: place == null ? void 0 : place.title }) }, index2);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: " text-center mt-4 text-sm text-white/40 font-extralight", children: [
        "Copyright 2025 © | ",
        /* @__PURE__ */ jsx("a", { href: "/", children: "Dersck" })
      ] })
    ] })
  ] });
};
const LatestStarRating = ({ rating = 0, maxStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg", children: /* @__PURE__ */ jsx(BsStarFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg", children: /* @__PURE__ */ jsx(BsStar, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-0", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-yellow-400` }) }),
    /* @__PURE__ */ jsxs("div", { className: ` text-sm`, children: [
      "Rating: ",
      Number(rating).toFixed(0)
    ] })
  ] });
};
const Related = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getListingByCategory(category2, limit2);
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsx("div", { className: `w-[95%] md:w-[90%] xl:w-[80%] mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: `mt-10 border-t pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-semibold text-xl`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px]`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4`, children: listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: IMG_BASE_URL2 + (data == null ? void 0 : data.image_url),
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    }) })
  ] }) });
};
const Header = ({ listing }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: `text-[24px] font-bold mt-[0px] leading-7`, children: listing == null ? void 0 : listing.title }),
    /* @__PURE__ */ jsxs("div", { className: `text-[13px] mt-1.5 leading-[1.2em]`, children: [
      (listing == null ? void 0 : listing.address_one) ? `${listing == null ? void 0 : listing.address_one}, ` : "",
      (listing == null ? void 0 : listing.address_two) ? `${listing == null ? void 0 : listing.address_two}, ` : "",
      (listing == null ? void 0 : listing.city_name) ? `${listing == null ? void 0 : listing.city_name}, ` : "",
      (listing == null ? void 0 : listing.state_name) ? `${listing == null ? void 0 : listing.state_name}, ` : "",
      listing == null ? void 0 : listing.country_name
    ] })
  ] });
};
const GalleryContext = createContext(null);
function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}
const GalleryProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [gallery, setGallery] = useState(null);
  const slider = useSliderContext();
  const [listing, setListing] = useState(null);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const handleClose = () => setShow(false);
  let vals = {
    setShow,
    setGallery,
    setListing
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(gallery);
  };
  return /* @__PURE__ */ jsxs(GalleryContext.Provider, { value: vals, children: [
    show && /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: (e) => setShow(false),
        className: `flex w-screen h-screen bg-black/40 
                        z-[3000] fixed top-0 left-0 right-0 bottom-0
                        place-items-center place-content-center px-[15px]`,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            onMouseDown: (e) => e.stopPropagation(),
            className: `w-[95%] sm:w-[95%] md:w-[80%] h-fit mx-auto
                         bg-white rounded-lg shadow-md space-y-6
                         z-[3100] overflow-hidden`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: `w-full h-full`, children: [
                /* @__PURE__ */ jsx("div", { className: `border-b py-3 px-3`, children: /* @__PURE__ */ jsxs("div", { className: `font-bold text-gray-700
                                    text-xl`, children: [
                  "Gallery for ",
                  listing && (listing == null ? void 0 : listing.title)
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: `grid grid-cols-4 md:grid-cols-6 gap-2 
                                max-h-[300px] overflow-y-auto pt-2 px-2 pb-2
                                bg-black`, children: gallery && (gallery == null ? void 0 : gallery.map((image, index2) => {
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      onClick: () => showCarousel(index2),
                      className: `relative hover:cursor-pointer
                                                 bg-red-200 md:h-[100px] lg:h-[120px] rounded-md
                                                 overflow-hidden`,
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          className: `object-cover w-full h-full`,
                          src: IMG_BASE_URL2 + image.image_url,
                          alt: ""
                        }
                      )
                    }
                  );
                })) })
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  onMouseDown: () => handleClose(),
                  className: `w-[50px] h-[50px] z-[300] bg-white
                                flex place-content-center place-items-center
                                rounded-full absolute left-2 top-2 cursor-pointer
                                hover:bg-white/40 transition duration-1000 ease-in-out`,
                  children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
                }
              )
            ]
          }
        )
      }
    ),
    children
  ] });
};
const Masonry = ({ images, listing }) => {
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const [items, setItems] = useState([]);
  const slider = useSliderContext();
  const gallery = useGallery();
  const [shortGallery, setShortGallery] = useState([]);
  useEffect(() => {
    let shortGallery2 = [...items];
    if (images) {
      images.map((image, index2) => {
        if (index2 + 1 < 12) {
          shortGallery2.push(image);
        }
      });
      setShortGallery(shortGallery2);
    }
  }, [images]);
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(images);
    slider.setListing(listing);
  };
  const showGallery = (index2) => {
    gallery.setShow(true);
    gallery.setGallery(images);
    gallery.setListing(listing);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 md:grid-cols-6 gap-2 ", children: [
      shortGallery.length > 1 && shortGallery.map((img, index2) => {
        return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          "div",
          {
            className: `h-[100px] sm:h-[100px] lg:h-[100px]
                                    hover:cursor-pointer`,
            onMouseDown: (e) => showCarousel(index2),
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: IMG_BASE_URL2 + img.image_url,
                alt: img.alt,
                className: `object-cover w-full h-full rounded-md shadow-md 
                                                transition-transform`
              }
            )
          },
          index2
        ) }, index2);
      }),
      shortGallery.length > 1 && /* @__PURE__ */ jsx(
        "div",
        {
          onMouseDown: (e) => showGallery(),
          className: ` h-[100px] sm:h-[100px] lg:h-[100px] relative`,
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              className: `w-full h-full rounded-md shadow-md 
                                            transition-transform bg-black/80 flex flex-col
                                            place-items-center place-content-center text-white
                                            text-[20px] cursor-pointer`,
              children: [
                /* @__PURE__ */ jsx(BsArrowReturnRight, {}),
                " view all..."
              ]
            }
          )
        }
      )
    ] }),
    shortGallery.length > 1 && /* @__PURE__ */ jsx("div", { className: `h-2` })
  ] });
};
const Description = ({ listing }) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    if (listing.gid) {
      let imgdata = getBusinessProfileImageData(listing.gid);
      imgdata.then((data) => {
        setImg(data.image_url);
      });
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-lg`, children: "About this business" }),
    /* @__PURE__ */ jsxs("div", { className: `flex place-items-start place-content-start
                gap-2 mt-4 mb-3`, children: [
      /* @__PURE__ */ jsx("div", { className: `rounded-full bg-black w-[30px] h-[30px]
                    overflow-hidden relative`, children: /* @__PURE__ */ jsx(
        "img",
        {
          className: `object-cover w-full h-full`,
          src: img,
          alt: ""
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
        /* @__PURE__ */ jsx("div", { className: `text-md font-bold tracking-tight leading-[1.2em]`, children: listing.title }),
        /* @__PURE__ */ jsx("div", { className: `text-[12px] capitalize`, children: listing.category })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-5 text-[14px] mt-4 whitespace-pre-wrap`, children: listing == null ? void 0 : listing.long_description })
  ] });
};
const Address = () => {
  return /* @__PURE__ */ jsxs("div", { className: `bg-blue-50/50 rounded-[5px] overflow-hidden  px-0 pt-0 pb-5 w-full`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-bold text-[18px] border-b pb-2 
                 shadow-gray-700/40 px-3 bg-blue-100/50 pt-3`, children: "Address" }),
    /* @__PURE__ */ jsx("div", { className: "h-[30px]" }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 
            text-[14px] space-y-4 lg:space-y-4 tracking-tight
            md:space-x-4 lg:space-x-0 text-black/80 font-sans
            px-3`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-full`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1 `, children: /* @__PURE__ */ jsx(MdLocationPin, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2`, children: "13 West Bestern Street, 23897, New York City, USA" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: `  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `tel:+154983459`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1`, children: /* @__PURE__ */ jsx(MdPhone, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2`, children: "+1 54 98 345 9" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: `  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `http://www.google.com/entry/permit`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1 relative top-0
                            `, children: /* @__PURE__ */ jsx(MdOutline3gMobiledata, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2 top-0
                            flex place-items-center`, children: "Website" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: `  w-full`, children: /* @__PURE__ */ jsx(Link, { to: `mailto:info@comcerc.com`, children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12`, children: [
        /* @__PURE__ */ jsx("div", { className: `col-span-1 relative top-0
                            `, children: /* @__PURE__ */ jsx(MdEmail, { className: `text-[22px]` }) }),
        /* @__PURE__ */ jsx("div", { className: `col-span-11 leading-[1.2em] ml-2 top-0
                            flex place-items-center`, children: "Email Address" })
      ] }) }) })
    ] })
  ] });
};
const maximumWords = 100;
const RatingContext = createContext(null);
function useRating() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
}
const RatingSchema = z.object({
  fullname: z.any(),
  rating: z.any(),
  comment: z.any()
});
function RatingProvider({ children }) {
  var _a, _b, _c;
  const [show, setShow] = useState(false);
  const [working, setWorking] = useState(false);
  const [listing, setListing] = useState(null);
  const [ratingData, setRatingData] = useState(void 0);
  const [text, setText] = useState("");
  const notification = useNotification();
  const [stars, setStars] = useState(5);
  let { user } = useAuth();
  const [formdata, setFormdata] = useState(null);
  const [wordLimitReached, setWordLimitReached] = useState(false);
  const countWords = (input) => {
    return input.trim() === "" ? 0 : input.trim().split(/\s+/).length;
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(RatingSchema)
  });
  const handleTextChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= maximumWords) {
      setValue("text", input);
      setWordLimitReached(false);
    } else {
      setWordLimitReached(true);
      const trimmedWords = words.slice(0, maximumWords).join(" ");
      setValue("text", trimmedWords);
    }
  };
  const postRating = async (data) => {
    notification.notify("Working...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const userGuid = user.guid;
    const businessGuid = listing.gid;
    data["user_guid"] = userGuid;
    data["business_guid"] = businessGuid;
    const BASE_URL = "https://gursse.com";
    const endpoint = `/api/rating`;
    const url = BASE_URL + endpoint;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const datar = await res.json();
      if (res.ok) {
        notification.alert("Success", "Rating submitted successfully!");
      } else {
        notification.alert("Error", datar.error);
      }
    } catch (error) {
      notification.alert("", error.message);
    }
  };
  const validateData = async (data, user2) => {
    if ((data == null ? void 0 : data.length) === 0) {
      let fname = (user2 == null ? void 0 : user2.first_name) || "";
      let lname = (user2 == null ? void 0 : user2.last_name) || "";
      let fullname = fname + " " + lname;
      setValue("fullname", fullname);
    }
  };
  let vals = {
    show,
    setShow,
    setListing,
    reset,
    setRatingData,
    validateData
  };
  const textValue = watch("text") || "";
  const handleKeyDown = (e) => {
    const words = textValue.trim().split(/\s+/);
    if (words.length >= maximumWords && e.key !== "Backspace" && e.key !== "Delete" && !e.ctrlKey) {
      e.preventDefault();
      setWordLimitReached(true);
    } else {
      setWordLimitReached(false);
    }
  };
  return /* @__PURE__ */ jsxs(RatingContext.Provider, { value: vals, children: [
    show && /* @__PURE__ */ jsx("div", { className: `flex w-screen h-screen bg-black/40 z-[3000] 
                fixed top-0 left-0 right-0 bottom-0 place-items-center place-content-center`, children: /* @__PURE__ */ jsxs("div", { className: `w-[450px] h-fit mx-auto p-6 bg-white rounded-xl shadow-md space-y-6`, children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Create/Edit Rating" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(postRating), className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Full Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("fullname", {
                onChange: changeHandler
              }),
              type: "text",
              className: "w-full px-3 py-2 border rounded-md",
              placeholder: "Enter Business GUID"
            }
          ),
          ((_a = errors.fullname) == null ? void 0 : _a.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-1 text-sm", children: errors.fullname.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Stars" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              ...register("rating", {
                onChange: (e) => {
                  setStars(Number(e.target.value));
                  changeHandler(e);
                }
              }),
              className: "w-full px-3 py-2 border rounded-md",
              children: [5, 4, 3, 2, 1].map((s) => /* @__PURE__ */ jsxs("option", { value: s, children: [
                s,
                " Star",
                s > 1 ? "s" : ""
              ] }, s))
            }
          ),
          ((_b = errors.rating) == null ? void 0 : _b.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-1 text-sm", children: errors.rating.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex place-content-between", children: [
            /* @__PURE__ */ jsx("label", { className: "block mb-1 text-sm font-semibold", children: "Comment" }),
            /* @__PURE__ */ jsxs("label", { className: " text-gray-600 text-sm", children: [
              "Word Count: ",
              /* @__PURE__ */ jsx("strong", { children: countWords(text) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              ...register("comment", {
                onChange: (e) => {
                  let words = countWords(text);
                  if (words <= maximumWords) {
                    setText(e.target.value);
                    handleTextChange(e);
                    changeHandler(e);
                  } else {
                    e.preventDefault();
                  }
                }
              }),
              onKeyDown: handleKeyDown,
              className: "w-full px-3 py-2 border rounded-md text-sm",
              placeholder: "Write your review...",
              rows: 4
            }
          ),
          wordLimitReached && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-0 text-sm", children: "Maximum maximumWords words allowed." }),
          ((_c = errors.comment) == null ? void 0 : _c.message) && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-0 text-sm", children: errors.comment.message.toString() })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-full grid grid-cols-2 gap-2`, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShow(false),
              className: `w-full bg-red-200 rounded-md
                                        hover:bg-red-100`,
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: working,
              className: "w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700",
              children: working ? "Submitting..." : "Submit Rating"
            }
          )
        ] })
      ] })
    ] }) }),
    children
  ] });
}
const Review = ({ listing }) => {
  const rating = useRating();
  const { user } = useAuth();
  const notification = useNotification();
  useEffect(() => {
    if ((listing == null ? void 0 : listing.gid) && (user == null ? void 0 : user.guid)) {
      rating.setListing(listing);
      getRating(user.guid, listing.gid).then((data) => {
        if ((data == null ? void 0 : data.length) !== 0) {
          rating.reset(data);
          rating.setRatingData(data);
        } else {
          rating.validateData(data, user);
        }
      });
    }
  }, [listing, user]);
  const handleResult = (confirmed) => {
    if (confirmed) {
      notification.cancel();
      window.location.href = "/signin";
    } else {
      notification.cancel();
    }
  };
  const handleShow = () => {
    if ((user == null ? void 0 : user.guid) === null || (user == null ? void 0 : user.guid) === void 0) {
      notification.confirm("Login to continue", handleResult);
    } else {
      rating.setShow(true);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: `mx-auto w-full sm:w-[60%] lg:w-full mt-3`, children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => handleShow(),
      className: `bg-blue-500 text-white flex flex-col
                items-center py-2 w-full `,
      children: "Write Review"
    }
  ) });
};
const StarRating = ({
  ratingsData,
  rating = 3.5,
  maxStars = 5
}) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-md", children: /* @__PURE__ */ jsx(BsStarFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-md", children: /* @__PURE__ */ jsx(BsStar, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-6", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-yellow-400` }) }),
    /* @__PURE__ */ jsxs("div", { className: ` text-sm`, children: [
      "Rating: ",
      rating
    ] }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-yellow-400` }) }),
    /* @__PURE__ */ jsxs("div", { className: `text-sm`, children: [
      "Reviews: ",
      Number(ratingsData.rating_count)
    ] })
  ] });
};
const BusinessFeatures = ({ listing }) => {
  const [features, setFeatures] = useState(void 0);
  useEffect(() => {
    getBusinessFeatures(listing.gid).then((data) => {
      setFeatures(data);
    });
  }, [listing.business_guid]);
  return /* @__PURE__ */ jsxs("div", { className: " mt-12", children: [
    /* @__PURE__ */ jsx("div", { className: ` font-bold text-xl`, children: "Features" }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 gap-4 mt-3`, children: features == null ? void 0 : features.map((feature, index2) => {
      return /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
        /* @__PURE__ */ jsx("div", { className: `font-bold`, children: feature.name }),
        /* @__PURE__ */ jsx("div", { className: `text-sm mt-[-2px] text-gray-500 leading-[1.2em] tracking-normal`, children: feature.user_description || feature.description })
      ] }, index2);
    }) })
  ] });
};
const ShortDescription = ({ listing }) => {
  return /* @__PURE__ */ jsxs("div", { className: `mt-4`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-lg font-bold`, children: "Intro" }),
    /* @__PURE__ */ jsx("div", { className: ` text-[14px] flex flex-col gap-y-4 whitespace-pre-wrap`, children: listing.short_description })
  ] });
};
const SingleStarRating = ({ rating = 3.5, maxStars = 5 }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg", children: /* @__PURE__ */ jsx(BsStarFill, {}) }, i)
      );
    } else {
      stars.push(
        /* @__PURE__ */ jsx("span", { className: "text-yellow-500 text-lg", children: /* @__PURE__ */ jsx(BsStar, {}) }, i)
      );
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: " flex w-full place-items-center gap-2 mt-0", children: [
    /* @__PURE__ */ jsx("div", { className: `flex  gap-x-[3px] -mt-[2px]`, children: stars }),
    /* @__PURE__ */ jsx("div", { className: `text-gray-400`, children: /* @__PURE__ */ jsx(BiSolidRightArrow, { className: `text-[15px] text-yellow-400` }) }),
    /* @__PURE__ */ jsxs("div", { className: ` text-sm`, children: [
      "Rating: ",
      Number(rating).toFixed(0)
    ] })
  ] });
};
const BusinessRatings = ({ listing }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingsRevews, setRatingsReviews] = useState({});
  useEffect(() => {
    const getReviews = async (guid) => {
      if (guid) {
        await getBusinessRatings(guid).then((data) => {
          setReviews(data);
        });
      }
    };
    const getRatingsReviewsData = async (guid) => {
      if (guid) {
        await getRatingsReviews(guid).then((data) => {
          setRatingsReviews(data);
        });
      }
    };
    if (listing.gid) {
      getReviews(listing.gid);
      getRatingsReviewsData(listing.gid);
    }
  }, [listing]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-12`, children: [
    /* @__PURE__ */ jsx("div", { className: `text-xl font-bold`, children: "Reviews" }),
    /* @__PURE__ */ jsxs("div", { className: `-mt-1 text-[14px] flex flex-col -gap-y-1 font-light`, children: [
      /* @__PURE__ */ jsx("div", { className: `font-bold`, children: "Overall Rating:" }),
      ratingsRevews && /* @__PURE__ */ jsx(SingleStarRating, { rating: ratingsRevews == null ? void 0 : ratingsRevews.rating_average })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: `mt-3` }),
    /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-y-4 divide-y-[1px]`, children: reviews !== null && (reviews == null ? void 0 : reviews.map((review, index2) => {
      return /* @__PURE__ */ jsxs("div", { className: `pt-7 pb-4`, children: [
        /* @__PURE__ */ jsxs("div", { className: `flex place-items-start gap-2`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-[30px] h-[30px] rounded-full
                                        bg-black overflow-hidden`, children: /* @__PURE__ */ jsx("img", { src: review.image_url, alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
            /* @__PURE__ */ jsx("div", { className: `text-sm font-bold`, children: review.fullname }),
            /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: `${review == null ? void 0 : review.city_name}, ${review == null ? void 0 : review.state_name}` }),
            /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: `${review == null ? void 0 : review.country_name}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `mt-2`, children: [
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(SingleStarRating, { rating: review.rating }) }),
          /* @__PURE__ */ jsxs("div", { className: `text-[12px] flex gap-1 place-items-center`, children: [
            /* @__PURE__ */ jsx("b", { children: "Created at:" }),
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: getLocalDate(review.created_at) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `text-[12px] flex gap-1 place-items-center`, children: [
            /* @__PURE__ */ jsx("b", { children: "Last Edited:" }),
            /* @__PURE__ */ jsx("span", { className: `text-[12px]`, children: getLocalDate(review.updated_at) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `text-[14px] mt-2`, children: review.comment })
        ] })
      ] }, index2);
    })) })
  ] });
};
const BusinessLayout = ({
  listing,
  images,
  ratingsData
}) => {
  return /* @__PURE__ */ jsx("div", { className: `px-[20px]`, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] w-full mx-auto bg-white`, children: [
    ratingsData && /* @__PURE__ */ jsx(StarRating, { ratingsData, rating: Number(ratingsData.rating_average) }),
    listing && /* @__PURE__ */ jsx(Header, { listing }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 mt-4 gap-4 relative`, children: [
      /* @__PURE__ */ jsxs("div", { className: ` col-span-12 lg:col-span-8`, children: [
        images && listing && /* @__PURE__ */ jsx(
          Masonry,
          {
            images,
            listing
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: `lg:hidden mt-5 mb-5`, children: [
          /* @__PURE__ */ jsx(Address, {}),
          listing && /* @__PURE__ */ jsx(Review, { listing })
        ] }),
        /* @__PURE__ */ jsx(ShortDescription, { listing }),
        /* @__PURE__ */ jsx(BusinessFeatures, { listing }),
        /* @__PURE__ */ jsx(Description, { listing }),
        listing && /* @__PURE__ */ jsx(BusinessRatings, { listing })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 hidden lg:block`, children: /* @__PURE__ */ jsxs("div", { className: ` sticky top-[100px]`, children: [
        /* @__PURE__ */ jsx(Address, {}),
        /* @__PURE__ */ jsx(Review, {})
      ] }) })
    ] })
  ] }) });
};
const related = [
  {
    gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
    url: "/address",
    img: "https://png.pngtree.com/element_our/sm/20180627/sm_5b334610deb59.jpg",
    title: "Microsoft California, United States",
    category: "Legal",
    short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
    phone: `+234 40 567 09`,
    address: `91764 Condoleza Avenue, Tristan Boulevard, Birmingham, London, UK`
  },
  {
    gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
    url: "/info-log",
    img: "https://i.pinimg.com/736x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg",
    title: "Apple Inc.",
    category: "InfoTech",
    short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
    phone: `+234 40 567 09`,
    address: `91764 Condoleza Avenue, Tristan Boulevard, London`
  },
  {
    gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
    url: "/info-log",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEU7V53///8yUZojR5bi5u+GlL45VZxCXqHd4e01U5tvgLMnSZbO1ORZb6rr7vU3VJwtTZi5wdmSn8SvudT19vrx8/instB/j7weRJR1hraMmsJidq2+xtzX3OrK0OKgrMxbcatPZ6Zleq8ANY9428BgAAAD/ElEQVR4nO3d23KbMBSFYSGwMAgEBp/jHJy+/zsW7LrtRYbIEGlvadZ/05uU8A02iiXAIvlT1ZW5iKW87KoHTNz/6XMtlaLesR9LKanz/j+hqXU8ukdK1+YhzBpJvTtOkk12F5qmod4XRzWNuQnrgnpPnFXUo7DX1PvhMN0Pwjy+k8y/VJ6IKuZDOBzESnRxnkcfyU6UMb9Ih5dpKaJ+G45vROo9QAghhBBCCCGEEEKIvEK2Ok3139JbWrdDUhYq6PVOJbUWL6v9pVqb3fbWbmeybP1avV02/Xu3Or1c8/GHgky1ab66ZMm3bc1rgLOhw9H72Fvo/hTcfLZq225tzQtQ2Ir+GV5wwlbun/SFJVTpYfc0MCShFG/P+0IS6s/tHGA4Qt3N8gUjVMdnT6GBCZW+zAUGIkw3s4FhCPXzo2BYwna1ABiCcLzyLGqhak3kQj17nAhEWLwsA/IXHp/6MBigUB4WArkLVWs/XRGmcPkh5C5Ml74LuQuLj8VA5kK94C/uIIRKzvtYH46wOC0H8hb+xIuUuXDG5GFQwub6A0DWQnl+irI16+qLOK89tfZvw93mcC30l1ErptK2f9CsTzrI+1tVYTkantNAb1tSVzvgZ0u9p3OTpRWwDBZoeSrdpNT7Ob/Wah445BuUrQaLDevR4Ju0zYJoGfI92Lr6HrgN+UVqNYOxDvlFKlKLabZL9MJ9uIOhsBOGfZu5jfAcvXAFIesghJB/EELIPwgh5B+EEPIPQgj5ByGE/ItDqCY6WgmntsDhTud8IptLS8+TWxij9RV2q7xLymin/T0I36IX9rQLGx6ExAsbHoSn6IU17SKxByGpz4fQEK+guhdSr/O7FxIPhx6E1Ov87oXUq+DuhdSXTLkXXok/PrkXtrELDfUlU86Fr9ELL9QXhTkXvkcvJJ+Kcy58ob6C2LmQ/K4u18It9XDoXJiR34vhWkj/RVWuhRvqwcK5kP4aadfCE/Vg4VxYU59KnQupfc6FO/Lh0LWQeirRvZB6KnFIfWbriSxudDYT/z17Jx8shoP49S30935ZrHIfjhMbYACcLo5rMaaCEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPzzKCR66pkvocpFGbmwFEQPlPIllJ0geuyZL6GuBNHjBz0JVZ6IpCc5iJ6Euh+ESU3x4DM/wqJORqFpCL5EwYuwacxNmGSF//OpD6Esxl8yChNTa9+nG/dCpWuTPIRJ0udaekW6FSoldd7ftyIem6u60ucXRLkV5mVXPbbyG8lbTVu7+lVZAAAAAElFTkSuQmCC",
    title: "Facebook Incorporated",
    category: "InfoTech",
    short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
    phone: `+234 40 567 09`,
    address: `91764 Condoleza Avenue, Tristan Boulevard, London`
  },
  {
    gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
    url: "/info",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAw1BMVEV3uQD///92uQD//v////1utQDV6b7G4KqBviNstABxtwB4uAP9//////xztwBksgC62Z6OxkCv1Irn8tqz1pKBvRmn0H3j8cpzuwBnsABxswDR5bdstgBtsgD///l7twJcrwCcyV++26Tk8tTH37OIwTKgzGj1+/DU6MHN47mz1ojt9uO12J2byliBwRjN4a6n0nWIw0WQxEx9wSje58LA3JmUyFqMvzur0YC/2aDQ5qr8+u6r0o6azm2SyUSfz3bi8cSAG1fCAAAQS0lEQVR4nO2djXvaNhPALdkGLNkShEBsEHYTykdDFwhdsnR71+7//6veO0nmKywt+VisPr6na1NqjH7c6XR3Omue94sLf+8BvLnUhO5LTei+1ITuS03ovtSE7ktN6L7UhO5LTei+1ITuS03ovtSE7ktN6L7UhO5LTei+1ITuS03ovtSE7ktN6L7UhO5LTei+1ITuS03ovtSE7ktN6L7UhO5LTei+1ITuy9sRcg6/XiavM45XucvROwMhfZm8yuDejpDCvV9ISF9jHG85D2mv9QKBN/deYxRvqMOCXZGXyTx8hXG8KWH7RXwBadSEPyM14fOlJqwJa8KfldclpJxT/N2jTKjRhzsSg5jx+gEJfPzdcUII1RgVoRKX7fk4/vhBgmR8Mm03ZkgZByRxm7DgQgxG982FGeNS6BSBpgMxknTVMKp0mpCp0XQOg4uDwA9i8jHEBAFMN6U09QahnP7+80ZaLUKk4JRFrSUYYYCTL/BBW81QCIE5lE72YHoWil7l2lh9xwhTuA2T92OwwpwEQWJN8ZMHOUKajQahoCnmiymnKrzOCUmCH1trpQh5KuR0AWzoPFE9eaM9bUWfzVAXjfNJxvCzOCaNYXSGhuwWoch+W6B5Gusbf77JwjBl4rNZLVBdybIDkOhr4Vco5j9hptUgxFoK52oyRqXkAczCWZvKASbnlMOKH+xY46IfMY6MMCWjNUxH/2nKahBipUKoJQ4nSMDwFlOpqJd6JSHZUsAPs5U0XwksKmoIOneAEN4erRJQVYzjnU0zUcBsKzaEO/5Eoy5uI0SkBSj+0gUr5VSkY5L4sPyBPs5GDNc/rgtIgoWyTfwkL5WYGJNtRsIzC4hqzapNSLFWmK3K0ZMuV3gznGWeGETf2o3FUkdto8kZRjOBn2irnLUUfAfoVEU0fspS358QkodRoxwMuZZCzzEITEO1muuXhxjTpBTVOe3CVYm5diWLIkVL5vLrE6vG+xOCC80xX9CjuQ8LzCxQMa0hvhDAuthknvYrGPLI9cJMxTgnXyUqGm+RXVfYSrnsQxxtVoNZL8WIBUYdfkH1JX6SwOK4NIQ6OKUMrteE8JY5IGqnSqPLahKCTgo5NBYGJAuGKzm4UMaGeuGw4EvJBOAV9kNEuiiNciwLgEZLDS9JfNxS35UQAkzV3QxlEVFtiDSb5iSPDd788+ryarkSI16k5Ydw+btBDACRFql2ulGfHI9R35Uw5eDpA+M5yEwJ42JUA51JQHI/v1YjxiKsYjQmittPgj/lUr8F1pahNDr0qLqroJWK2wRjGO05ci4o3kf1ZgRmXwK+Z4lrHgQ7V2DCPrnLdIyDnpZ68pMePHwTd0p7G3hdDqtHyM+2A1nrRN5A63lJ7iO8pqxEBeTPEWZO+FHgPPUCmmAAFPGS8KJ6hFRtBxIVqScoX6OH0Tr9IsQuIfiRa4WZPsawWdMM3k9Ir/RA2XEVvjfhcjOQvsBVnfcweMO/M7t5u6kmgr7+SLW+RNS1a2JCfmPgr/A6efUvq/77Win1NgNZSFQGj7q+mZcTu3W70WGS+DOJL+rVooxrQlxx4LLovJKrBS3UHAZmvPxarwbswTr9Jtsn1HINQGptfC+mWW1Z6MyLy/PjJvruhJz2YDIZJFja8DWZ29VjYHandwkDkhabbAkTDNC7/ujsX1aK9ycEjSxJYlfvifYsYRlifh08IvTJ/EPbZsOgeQBEzwMRQPOJasb7zkOeFsxaaQxK1K+NEjvH2L6nMS9CGmlUHAOgzSGzhs03zLdQJUIUcW0mHsRo9wzchsdWuDTAXxtK545HdmZyLJXCHCwE6JCawC+AGMHHuGAI+bKfBNUh5Jmp3UN+AYEplkPlGMaIBY0prATiGGGc+GSqQL+wvDDxlwHB6jGZjtLRH12yu6/x7oSUf7GExlWCGgXWu/HvLVYUxwh9MlsriGp5QdU62OQmQbxmqa65znaM9f0JvVA7wgAtq4W5UCouYVgYiuZCHLVSMhawtAA8ldegUG2RoMAZ1WYOeo2uK6RDdIUzYtdEWPZ1cQmWb8gbEjKDyI2KLWGsrZc8ZJgpc8rE2FJgotyQm+YnYAT3mlSDEKPtHjHzJrYLAIe4EzxHDCn+OvR2dOijRf7OwJgx/skuc2ONOlh/kLuDoOpmUREd4jthFddzKSdkajaZ5J+wTOoceBlln7eAYKAdiRX9lArII327suRkVuaP+p6o4eLDeTUI9bvL7BUm0y3uL1EdpQQQoiYkvmpudDhrtiJudmZkPyfGHyF5Y8T4/iBSJrrVIUwLOQdPaCwVHChuhoaXqBuNsLw5a84bjeb5TcYE1a4ES252aqKip6P90YB/kpdJRaxUv5tTWBVt9Ja3GCaBQrALYoLW5YiFURiGTOCVMAXlGivk5nr4fay592QAJhz71SGElY2qhc18/XwCESks9WyEikJChfUpvdsEMVAoV11T3DfZUn4pIbTb6yFlWT/Rm3SVISw4MCob24DW1gOK8Zgnsg6myMtQl+9hIWFhtv4YYCGV+BjYgLQj9E3pzgBEtsaopiy9VYJQ3wGSX9CLsaxz9JeYPYkw+u3qrjfS7Sa927Yp8/uoH1wCybwX7twBrZvLP8Z70UFlCFMIUMb2e89J1wtt/QWyZOygtbUNG41hjwb8NG9FbDsEiHL4QN7u81WIEFcw2bYrP4z+OlOmhoYxDfhLX1MZHQe6xjrE3afNB6P6hFwt9OpYSUJsluHl9gOu9bOVZLr3S7VN7wJmDJvd7sVZqFJwR1sPIxRro38hB7velSE0ondKIejO0Sj/OvfUAJLkzyTWMSYG49p/du9uNL3eaKR6bQnl9NA8q0iIFYnRA1op1rzRIrvtP6Tcyy0umlM2GphKow5vCsDLbofBkfS+eoQakfFPOh82CQMa5MevzeFwuGx+7a+9DLRKjZ/VQgFv3cyxLBBXcGfm2I3AX6jW3E5GGDXMv4/ShDRKb7KZbUT9gSJU4eoTOpZAt4k5QailUC2Mtn2jSlzxTU8bOpaUYhESdafk+qp7FKr6hEARRn30HAFGLstQ57t6+xs5OYQ26bRpClBuEhYYaIoo/L7Ukdwy1Kk+SKiUlK3plW6khannXOdeKaablKKTVJ3/XTX/7nQmk8637+dXwwvbPJNAkIPNN44S7ooYqF+wk31Xfs1e/V2pCd0nLFKG203Pl7jqhDZ7erZAplH1Jyyp+PxjU3xSKk5YeOLvZfMlsuyLVxjHm544INjL5DUA6zMVfgGpCd2XmtB9qQkPrk7T3dNjNkfIYAUNK03Fzokr+KM5nwT+E7rDRm9PcHvtsdNLsKrjHRxMs7mP6e9/Y8LCowcnspgbYOOh2azYjrk8QkeXalJa/uwVtiHKM49E7426MNuMe4PitkDH+fMM7rQ3CbYTpggh9MN25tOxGiNSMdjcME1TpV8USCXwcqGPrDFv1cKEeUZqe38jex86KK9+ZofaKRfT+7Oz87P/WTl76N96UmFolXrFtG9kEyxTPjnDFx4eBpT1H/SPLfhGbuEVe21/9a2TZtttKLqG6773H6a74Vrru72233lWFHcS4ZEDZ+Lh31I3tZVNwx09l3C4oW1UWCgu7T9+E5wdNpTGDftcItzf/tsi2o5PbXukL9TbE7YPSmSJ7miahMxjHd16EJA28yyhtNW1c+ZJ+/RQBwjPDpqe4R+Cfqbfg4RYZuyWhJynIxKYPSl4nT3H1byMMAh0R8Wl4jRLYtwphNGV/rVnu/A8WjxFmMRBQhq6gfMxIdh32SEPv92xfxnYGxICVhzE2NY2aGKdG0CYXTCUvbg7AnU+QYi7prlBfEToeVEXvjjzTfnxLPtPCAPbsY42Gsfm07sZFWt8EgbkuzDdB2qs2w7JHSj4kDDYUOIWjt6rmrKieERIRct8CwtTI78Xpx/idjohPs97gfLPDJVoaDuCZnaPeqh0BwlV2DHjBwTXyENCn8TdVqczmV5hq0oCWsJ2/iNWar2VT43Fz8PTz3B7BmFMFh8USBSNzsqG16WgA+v0cmmerViR2M8DspDeYysFDV5EekGUU5yJuFV1Cbd4ZKWZ2XlbfrB7Vc/wNc+YhwkZ4wgw/lKXdv+2qwpmu/jIBJ+D8sIG9pYQ0h6kBX9spUCI8Qul4a32VzkZwsp+SMhW5v6dkV1H2qcjnk4Ic2ZrRSPTJxMQiZPN9tQMUhi59LW6yRcc0jHCMjRQS/O+mTyYhzDlRrqNJQYLTs2sncni6MjejBBtUX8ygTU7tGbalbhJ/w3HlpOFdn9PEdKJNfWI7xGiT7kxTdZ3jKsL803e/wfzcE+HtGUJcQN0avUJqxYuHughSFv8iJCXup+IfUKw9CbJsfFRpAXrG+99ehn8pYSRJex5aKbm5xXjnm7kD8qnTZ4mtP2YnUfzEKMIcNYXCs+ZwBuAQk+eiC8k5CVVT/A0nJMcvSI+pG6e/EpmpsP5KUIvGh8lhEx0auxghaFMOIx1V9y58PhJkC8k9GRsCSH7xQjLxxAE1n/r+5YmznqSMJsZK/22Twj2MTb31lMZIgowUr1uFul/SLirQ4jcwHvicj4RqtQL/6EO6aich/SA0D4B+DE094ApiUpci/9UhzuEkMbjKRBJnIN7USYmtUb6NGHHEhbeHiEtc7VWFqHIO9O8OVenxTWvR+jpZxD1ITxdiFRiPFThI9OnQxzLni6UrYJEDfNt+PIgarNhYNy1srARojpt0K9KSIU+5YsQOQxAlQG5tRb1SIfgILUlFvhAg2+RD9bDy/LZfSObA3vOT8uhXpVQu0XMoP4G5xGAy5HecUJY4/7JsM0mzM6wu0YPPNwnhHBJKzHw8XQYSLHK54UW8v106AmdOMAF5o8m48fnIRhwF8svn/GQCT/XuoIgdX+1KHv2DyQh65Mit9clLNJtigzj+60sHT2VAWsLzMmncDcDpgW7w0f94JsYbmS5MMnbaXHN6xLSqLs77E1K/iNCcMDYOr0hVHDjGVYPIIbB7kYUFYI3NWeKhKcsF69L6A12K2nDwc8SkhnXvnhD6Il7omtAY1WW2PHxP6L7Osn1Kb7mGfnhfkyzr0PKN4PGnPY44WMZqnS/1kbVXCfG5DvbHNAO62030CfiLE6p1zyrXrqpZ9JNJbRnbrQJo1G29aTMvtIR6IwOLHR+7tmJtamXKq880SDcHeCm1ro+Iaw5rebd6ulj1m+2mxNeD+WmZeIM+KKLnpUv3rYMn7Z6LXxNnyBpf9bSEpFUm2lFey19fzwyo8fh8htO9/wm7XFz/xP+twKn7j1Rb6dXGysZKRUCom7zpZrnC+0ugz2ZDqVgnn7dvEPQ7U4EVsiLzSA4E9RjDE1Smy1PvXT/84XdpXkrQoqnV3rbu6eF3TArT/swz/foAfCd6yheaI4C02dFlP9fCKo7UrffmG4nhpcE3e5b7X1+Ufb6//y46x1S96UmdF9qQvelJnRfakL3pSZ0X2pC96UmdF9qQvelJnRfakL3pSZ0X2pC96UmdF9qQvelJnRfakL3pSZ0X2pC96UmdF9qQvelJnRfakL3pSZ0X2pC96UmdF9qQvelJnRfNg93/LLS+z+FeDssPpwmMAAAAABJRU5ErkJggg==",
    title: "NVIDIA Global Technologies",
    category: "Legal",
    short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
    phone: `+234 40 567 09`,
    address: `91764 Condoleza Avenue, Tristan Boulevard, Birmingham, London, UK`
  },
  {
    gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
    url: "/info-log",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxCWYT8S1wAr5DWDNuFOE5NMPwmhE7zBXPQ&s",
    title: "JP Morgan",
    category: "InfoTech",
    short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
    phone: `+234 40 567 09`,
    address: `91764 Condoleza Avenue, Tristan Boulevard, London`
  },
  {
    gid: "152453-adf234af-lasga032ad-la4lasflg3sgs",
    url: "/address",
    img: "https://png.pngtree.com/element_our/sm/20180627/sm_5b334610deb59.jpg",
    title: "Microsoft California, United States",
    category: "Legal",
    short_description: "Discover Getty Images' unrivaled collection of royalty-free images to find the perfect stock photo, vector, or illustration that resonates with your. Discovering the major upgrades",
    phone: `+234 40 567 09`,
    address: `91764 Condoleza Avenue, Tristan Boulevard, Birmingham, London, UK`
  }
];
const loader$M = async ({ request, params }) => {
  const id = params.id || null;
  let listing = await getQuery$1(id);
  const gallery = await getBusinessGallery(id);
  const ratingData = await getRatingsReviews(id);
  let message = "Hello! We are here";
  return {
    message,
    listing,
    related,
    gallery,
    ratingsData: ratingData
  };
};
const index$g = () => {
  const data = useLoaderData();
  const listing = data.listing;
  data.related;
  const gallery = data.gallery;
  const ratingsData = data.ratingsData;
  return /* @__PURE__ */ jsx(RatingProvider, { children: /* @__PURE__ */ jsxs(GalleryProvider, { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$2, {}),
    /* @__PURE__ */ jsx(SearchHeader, {}),
    /* @__PURE__ */ jsx(
      BusinessLayout,
      {
        listing,
        images: gallery,
        ratingsData
      }
    ),
    /* @__PURE__ */ jsx("div", { className: `h-32` }),
    /* @__PURE__ */ jsx(
      Related,
      {
        category: listing == null ? void 0 : listing.category,
        limit: 6,
        title: `Related: ${listing == null ? void 0 : listing.category}`,
        subtitle: "Related based on the same category."
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$g,
  loader: loader$M
}, Symbol.toStringTag, { value: "Module" }));
const Nav$1 = ({ openNav }) => {
  const [navBg, setNavBg] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(3);
  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= scrollHeight) {
        setNavBg(true);
      }
      if (window.scrollY < scrollHeight) {
        setNavBg(false);
      }
    };
    window.onscroll = () => handler();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `fixed ${navBg ? "bg-black" : "bg-black"} h-[10vh] z-[300] w-full transition-all ease-in-out duration-100 border-b border-gray-500/50`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto", children: [
    /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
    /* @__PURE__ */ jsx("div", { className: ` lg:flex items-center space-x-14  hidden` }),
    /* @__PURE__ */ jsx("div", { className: " flex items-center space-x-4" })
  ] }) });
};
const ResponsiveNav$1 = () => {
  const [showNav, setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Nav$1, { openNav: openNavHandler }),
    /* @__PURE__ */ jsx(MobileNav, { showNav, closeNav: closeNavHandler })
  ] });
};
const ResetPwSchema = z.object({
  username: z.string({ message: "Please enter an email" }).min(7, { message: "Email must be greater than 7 characters" }).email({ message: "Please enter a valid email" })
});
const ResetPwForm = () => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const auth = useAuth();
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  useNavigate();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleResetPw = async (data) => {
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const email = data.username;
    const datr = {
      email
    };
    const res = await auth.resetpw(datr);
    notification.alertCancel("", toSentenceCase(res));
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setWorking(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(ResetPwSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: " text-[26px] font-[500]", children: /* @__PURE__ */ jsx("div", { className: "pb-1 border-b", children: "Reset Password" }) }),
    /* @__PURE__ */ jsx("div", { className: " mt-6 text-[20px] leading-[1.2em]", children: "Enter your email address to reset your password?" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleResetPw), children: [
      /* @__PURE__ */ jsxs("div", { className: " mt-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("username", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px]  bg-gray-100  rounded-[8px] h-[50px] px-4",
            type: "text",
            placeholder: "Enter email address"
          }
        ),
        typeof (errors == null ? void 0 : errors.username) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: (_a = errors.username) == null ? void 0 : _a.message })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `${working ? " bg-gray-500/70" : "cursor-pointer bg-black"} mt-3  w-full text-white rounded-[8px] h-[50px] px-4`,
          type: "submit",
          disabled: working,
          children: working ? "Submitting..." : "Sign in"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: " mt-3 text-[11px]", children: "By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided." }),
    /* @__PURE__ */ jsxs("div", { className: `mt-1 flex place-content-between place-items-center`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.location.href = "/signup",
          className: ` text-blue-700 bg-gray-100
                                px-5 py-1 border rounded`,
          children: "Signup"
        }
      ),
      /* @__PURE__ */ jsx(Link, { to: `/signin`, children: /* @__PURE__ */ jsx("button", { className: `underline`, children: "Click to Sign In" }) })
    ] })
  ] }) }) });
};
const index$f = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    /* @__PURE__ */ jsx(ResetPwForm, {})
  ] });
};
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$f
}, Symbol.toStringTag, { value: "Module" }));
const Nav = ({ openNav }) => {
  const [navBg, setNavBg] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(1);
  const { user, signout } = useAuth();
  useEffect(() => {
    const handler = () => {
      window.scrollY >= scrollHeight && setNavBg(true);
      window.scrollY < scrollHeight && setNavBg(false);
    };
    window.onscroll = () => handler();
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `fixed ${navBg ? "bg-gray-800" : ""} h-[72px] z-[300] w-full transition-all ease-in-out duration-0`, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto", children: [
    /* @__PURE__ */ jsx(Logo, { theme: "dark" }),
    /* @__PURE__ */ jsx("div", { className: " lg:flex items-center space-x-14 text-white hidden", children: navlinks.map((navlink) => {
      return /* @__PURE__ */ jsx(Link, { to: navlink.url, children: /* @__PURE__ */ jsx("p", { className: "font-bold tracking-tighter text-[14px] text-white/80 font-sans hover:text-yellow-300", children: navlink.label }) }, navlink.id);
    }) }),
    /* @__PURE__ */ jsxs("div", { className: " flex items-center space-x-4", children: [
      user ? /* @__PURE__ */ jsx(UserMenu, { user, signout, navBg }) : /* @__PURE__ */ jsx(SigninLink, {}),
      /* @__PURE__ */ jsx(HiBars3BottomRight, { onClick: openNav, className: "sm:w-8 sm:h-8 w-6 h-6 cursor-pointer text-white" })
    ] })
  ] }) });
};
const ResponsiveNav = () => {
  const [showNav, setShowNav] = useState(false);
  const openNav = () => setShowNav(true);
  const closeNav = () => setShowNav(false);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Nav, { openNav }),
    /* @__PURE__ */ jsx(MobileNav, { showNav, closeNav })
  ] });
};
const Hero = () => {
  return /* @__PURE__ */ jsxs("div", { className: ' w-full pt-[4vh] md:pt-[12vh] h-screen bg-[#0f0715] overflow-hidden relative bg-[url("/images/hero.jpg")] bg-cover bg-center', children: [
    /* @__PURE__ */ jsx("div", { className: " absolute inset-0 bg-black opacity-30" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center flex-col w-[95%] sm:w-[80%] h-full mx-auto relative z-10", children: [
      /* @__PURE__ */ jsx("h1", { "data-aos": "fade-left", className: " text-white text-opacity-80 text-center text-base sm:text-lg uppercase font-medium", children: "The Best Way To" }),
      /* @__PURE__ */ jsx(
        "h1",
        {
          "data-aos": "fade-right",
          "data-aos-delay": "150",
          className: " text-center font-sans font-black text-3xl sm:text-5xl text-white mt-4",
          children: "Discover Businesses Globally"
        }
      ),
      /* @__PURE__ */ jsx(
        "p",
        {
          "data-aos": "fade-up",
          "data-aos-delay": "300",
          className: "mt-4 text-center text-sm sm:text-base text-gray-200",
          children: "More than 745,000 businesses, places & people."
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          "data-aos": "zoom-in",
          "data-aos-delay": "450",
          className: "mt-12 w-full",
          children: /* @__PURE__ */ jsx(SearchBox, {})
        }
      )
    ] })
  ] });
};
const Home = () => {
  return /* @__PURE__ */ jsx("div", { className: " overflow-hidden", children: /* @__PURE__ */ jsx(Hero, {}) });
};
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav, {}),
    /* @__PURE__ */ jsx(Home, {})
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const Feature = ({ feature }) => {
  return /* @__PURE__ */ jsxs("div", { id: feature.gid, className: `pb-5 pt-4`, children: [
    /* @__PURE__ */ jsx(Link, { to: `/${feature.gid}`, children: /* @__PURE__ */ jsx("div", { className: `text-[14.5px] tracking-tight 
                text-blue-800`, children: feature.title }) }),
    /* @__PURE__ */ jsx("div", { className: `text-md font-semibold 
                tracking-tight mt-[2px]`, children: feature.phone }),
    /* @__PURE__ */ jsx("div", { className: `text-[14px] font-normal 
                tracking-tighter mt-[2px] leading-[1.3em]
                text-gray-500`, children: feature.short_description.substring(0, 80) }),
    /* @__PURE__ */ jsx("div", { className: `text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`, children: feature.address_one }),
    /* @__PURE__ */ jsx("div", { className: `text-[13px] font-normal 
                tracking-tight mt-[8px] text-blue-800`, children: /* @__PURE__ */ jsx(Link, { to: feature.website ? feature.website : `#${feature.gid}`, children: "Website" }) })
  ] });
};
const Featured = () => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    getFeaturedListing().then((featured2) => {
      setFeatured(featured2);
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `border-[1px] px-4 pt-4 pb-0
        rounded border-gray-200`, children: [
    /* @__PURE__ */ jsx("div", { className: `font-semibold`, children: "Featured" }),
    /* @__PURE__ */ jsx("div", { className: `divide-y`, children: featured && (featured == null ? void 0 : featured.map((feature, index2) => {
      return /* @__PURE__ */ jsx(Feature, { feature }, index2);
    })) })
  ] });
};
const SearchLayout = ({
  children,
  featured,
  query: query2
}) => {
  const [queryParam, setQueryParam] = useState(null);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const query22 = searchParams.get("q");
    setQueryParam(query22);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: `px-[15px] `, children: /* @__PURE__ */ jsxs("div", { className: `max-w-[1100px] w-full mx-auto bg-white`, children: [
    queryParam && /* @__PURE__ */ jsxs("div", { className: `text-[24px] flex gap-x-2 mt-4 border-b`, children: [
      /* @__PURE__ */ jsx("div", { className: ``, children: "Search for" }),
      /* @__PURE__ */ jsx("div", { className: `font-bold`, children: query2 ? query2 : "" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 mt-5 gap-6 relative`, children: [
      /* @__PURE__ */ jsx("div", { className: ` col-span-12 lg:col-span-8`, children }),
      /* @__PURE__ */ jsx("div", { className: `col-span-12 lg:col-span-4 lg:block`, children: /* @__PURE__ */ jsx("div", { className: `sticky top-[100px]`, children: /* @__PURE__ */ jsx(Featured, {}) }) })
    ] })
  ] }) });
};
const LatestBusinesses = ({
  title,
  subtitle,
  category,
  limit
}) => {
  const [ti, setTi] = useState("");
  const [st, setSt] = useState("");
  const [listings, setListings] = useState([]);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  useEffect(() => {
    if (title && subtitle) {
      setTi(title);
      setSt(subtitle);
    }
  }, [title, subtitle]);
  let getListings = async (category2, limit2) => {
    if (limit2 && category2) {
      let cat = await getListingByCategory(category2, limit2);
      setListings(cat);
    }
  };
  useEffect(() => {
    if (limit && category) {
      getListings(category, limit);
    }
  }, [limit, category]);
  return /* @__PURE__ */ jsxs("div", { className: `mt-10 border-t pt-5`, children: [
    /* @__PURE__ */ jsxs("div", { className: ` mb-[20px] `, children: [
      /* @__PURE__ */ jsx("div", { className: `font-semibold text-xl`, children: ti }),
      /* @__PURE__ */ jsx("div", { className: `text-sm -mt-[2px]`, children: st })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4`, children: listings == null ? void 0 : listings.map((data, index2) => {
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { to: `/${data.gid}`, children: /* @__PURE__ */ jsx("div", { className: `relative h-[180px]`, children: /* @__PURE__ */ jsx(
          "img",
          {
            className: `object-cover w-full h-full
                                                    text-sm`,
            src: IMG_BASE_URL2 + (data == null ? void 0 : data.image_url),
            alt: data.title
          }
        ) }) }) }),
        /* @__PURE__ */ jsx("div", { className: `mt-1 text-[15px] tracking-tight 
                                     truncate`, children: data.title }),
        /* @__PURE__ */ jsx("div", { className: `mt-1`, children: /* @__PURE__ */ jsx(LatestStarRating, { rating: data.avg_rating }) }),
        /* @__PURE__ */ jsx("div", { className: `text-[11px] mt-[5px] tracking-tight
                                    leading-[1.2em]`, children: data.short_description.substring(0, 100) })
      ] }, index2);
    }) })
  ] });
};
const SearchPagination = ({
  data,
  itemsPerPage = 10,
  renderItem
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    currentItems.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { children: renderItem(item) }, index2);
    }),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: `flex justify-center gap-[5px] 
                mt-[60px]`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToPrevious,
          disabled: currentPage === 1,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Previous"
        }
      ),
      Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => paginate(number),
          className: `px-[12px] py-[8px]  cursor-pointer border
                                rounded-[4px] ${currentPage === number ? "bg-blue-500 text-white border-blue-500" : "bg-white"}`,
          children: number
        },
        number
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: goToNext,
          disabled: currentPage === totalPages,
          className: "px-[12px] py-[8px] bg-white cursor-pointer border\n                                rounded-[4px]",
          children: "Next"
        }
      )
    ] })
  ] });
};
const ResultCard = ({ listing }) => {
  var _a, _b;
  const IMG_BASE_URL2 = "https://oxbyt.com";
  return /* @__PURE__ */ jsxs("div", { className: ` cursor-pointer`, onClick: (e) => {
    window.location.href = `/${listing.gid}`;
  }, children: [
    /* @__PURE__ */ jsxs("div", { className: `flex pt-4  rounded-sm gap-4`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative min-w-[100px] w-[100px] h-[100px]`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: IMG_BASE_URL2 + listing.image_url,
          alt: listing.title,
          className: `object-cover w-full h-full text-sm
                            rounded `
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: " w-full", children: /* @__PURE__ */ jsxs("div", { className: `md:flex md:place-content-between 
                w-full md:gap-x-[4px]`, children: [
        /* @__PURE__ */ jsxs("div", { className: `w-full md:w-[60%]`, children: [
          /* @__PURE__ */ jsx(Link, { to: `/${listing.gid}`, onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx("div", { className: `font-bold text-[17px] text-brown-800
                    leading-[1.1em] hover:underline text-blue-900`, children: listing.title }) }),
          /* @__PURE__ */ jsx("div", { className: `font-normal text-[13px] leading-[1.2em] mt-[2px]
                    `, children: (listing == null ? void 0 : listing.business_phrases) ? `${(_a = listing == null ? void 0 : listing.business_phrases) == null ? void 0 : _a.substring(0, 150)}...` : "" }),
          /* @__PURE__ */ jsxs("div", { className: `font-normal text-[13px] 
                                    flex place-items-center gap-1 mt-[3px]`, children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                className: `hover:underline text-blue-700`,
                to: listing.website !== null ? listing.website : "#top",
                onClick: (e) => e.stopPropagation(),
                children: "Website"
              }
            ),
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FiArrowRight, {}) }),
            /* @__PURE__ */ jsx("div", { className: `capitalize flex place-items-center gap-1`, children: listing.category })
          ] }),
          (listing == null ? void 0 : listing.established) && /* @__PURE__ */ jsxs("div", { className: `flex gap-2 mt-[5px] place-items-center`, children: [
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BsBank, {}) }),
            /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-y-0 leading-3`, children: [
              /* @__PURE__ */ jsxs("div", { className: `text-[12px] font-bold`, children: [
                "Since ",
                listing == null ? void 0 : listing.established
              ] }),
              /* @__PURE__ */ jsx("div", { className: `text-[12px]`, children: "In Business" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `w-full lg:w-[40%] hidden 
                                lg:block`, children: [
          /* @__PURE__ */ jsx("div", { className: `flex flex-col 
                    place-items-end place-content-end
                        font-semibold text-[15px] tracking-tighter`, children: listing.phone }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col text-end text-[12px]
                                leading-[1.2em]`, children: [
            listing == null ? void 0 : listing.address_one,
            (listing == null ? void 0 : listing.address_two) ? `, ${listing == null ? void 0 : listing.address_two}` : "",
            (listing == null ? void 0 : listing.city_name) ? `, ${listing == null ? void 0 : listing.city_name}` : "",
            (listing == null ? void 0 : listing.state_name) ? `, ${listing == null ? void 0 : listing.state_name}` : "",
            (listing == null ? void 0 : listing.country_name) ? `, ${listing == null ? void 0 : listing.country_name}` : ""
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `mt-2 md:mt-3 mb-2 text-[13px] leading-[1.2em]
                    flex place-content-start`, children: [
      /* @__PURE__ */ jsx("div", { className: `relative top-[-3px]`, children: /* @__PURE__ */ jsx(RiDoubleQuotesL, { className: `tracking-tighter text-[20px]` }) }),
      /* @__PURE__ */ jsx("div", { children: (listing == null ? void 0 : listing.short_description) ? `${(_b = listing == null ? void 0 : listing.short_description) == null ? void 0 : _b.substring(0, 150)}...` : "" })
    ] })
  ] });
};
const getQuery = async (criteria) => {
  const BASE_URL = "https://gursse.com";
  const endpoint = "/api/listings/search?q=" + criteria;
  const url = BASE_URL + endpoint;
  console.log(url + "aa");
  try {
    const response = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return new Promise((resolve) => setTimeout(() => {
      resolve(data);
    }, 10));
  } catch (error) {
    return void 0;
  }
};
const loader$L = async ({ request, params }) => {
  const url = new URL(request.url);
  const query2 = url.searchParams.get("q") || "";
  let datar = await getQuery(query2);
  let realestate = await getListingByCategory("automotive", 4);
  let data = {
    datar,
    query: query2,
    realestate
  };
  return data;
};
const index$e = () => {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$2, {}),
    /* @__PURE__ */ jsx(SearchHeader, { query: data.query }),
    data && /* @__PURE__ */ jsxs(
      SearchLayout,
      {
        contacts: data.datar,
        query: data.query,
        children: [
          /* @__PURE__ */ jsx(
            SearchPagination,
            {
              data: data.datar,
              itemsPerPage: 20,
              renderItem: (item) => {
                return /* @__PURE__ */ jsx(ResultCard, { listing: item }, index$e);
              }
            }
          ),
          /* @__PURE__ */ jsx(
            LatestBusinesses,
            {
              category: "entertainment",
              limit: 5,
              title: "Entertainment",
              subtitle: "Entertainment based businesses added in the last 7 days"
            }
          ),
          /* @__PURE__ */ jsx(
            LatestBusinesses,
            {
              category: "services",
              limit: 5,
              title: "Services",
              subtitle: "Services based businesses added in the last 7 days"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$e,
  loader: loader$L
}, Symbol.toStringTag, { value: "Module" }));
const password_regex$1 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const SigninSchema = z.object({
  username: z.string({ message: "Please enter an email" }).min(7, { message: "Email must be greater than 7 characters" }).email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex$1, "Please enter a valid password")
});
const SigninForm = () => {
  const [formdata, setFormdata] = useState(null);
  const { signin } = useAuth();
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const navigator = useNavigate();
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSigninForm = async (data) => {
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const email = data.username;
    const password = data.password;
    const datr = {
      email,
      password
    };
    const res = await signin(datr);
    if (res === true) {
      notification.cancel();
      navigator("/");
    } else {
      notification.alertCancel("Complete Your Signup", res.message);
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setWorking(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SigninSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: " text-[26px] font-[500]", children: /* @__PURE__ */ jsx("div", { className: "pb-1 border-b", children: "Sign in" }) }),
    /* @__PURE__ */ jsx("div", { className: " mt-6 text-[20px] leading-[1.2em]", children: "Enter you email address and password?" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleSigninForm), children: [
      /* @__PURE__ */ jsxs("div", { className: " mt-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("username", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded h-[50px] px-4",
            type: "text",
            placeholder: "Enter email address"
          }
        ),
        (errors == null ? void 0 : errors.username) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: errors.username.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " mt-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px] bg-gray-100   rounded h-[50px] px-4",
            type: "password",
            placeholder: "Enter password"
          }
        ),
        (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: errors.password.message })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `${working ? " bg-gray-500/70" : "cursor-pointer bg-black"} mt-3  w-full text-white 
                            rounded-full h-[50px] px-4 hover:bg-blue-800`,
          type: "submit",
          disabled: working,
          children: working ? "Submitting..." : "Sign in"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: " mt-3 text-[11px]", children: "By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided." }),
    /* @__PURE__ */ jsxs("div", { className: `mt-1 flex place-content-between place-items-center`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => window.location.href = "/signup",
          className: `text-black bg-gray-100
                                px-5 py-1 border rounded-full border-black/40
                                hover:bg-blue-100 hover:shadow-lg hover:shadow-black/20`,
          children: "Signup"
        }
      ),
      /* @__PURE__ */ jsx(Link, { to: `/resetpw`, children: /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: `underline`,
          children: "Forgot Password?"
        }
      ) })
    ] })
  ] }) }) });
};
const Signin = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    /* @__PURE__ */ jsx(SigninForm, {})
  ] });
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Signin
}, Symbol.toStringTag, { value: "Module" }));
const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const SignupSchema = z.object({
  email: z.string({ message: "Please enter an email" }).min(7, { message: "Email must be greater than 7 characters" }).email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Please enter a password" }).min(8, "Password must be at least 8 characters").regex(password_regex, "Please enter a valid password"),
  first_name: z.string({ message: "Please enter your first name" }).min(1, { message: "First name must be at least 1 character" }).max(50, { message: "First name must be at most 50 characters" })
});
const SignupForm = () => {
  var _a, _b, _c;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  useNavigate();
  const [signedup, setSignedup] = useState(false);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSignup = async (data) => {
    setWorking(true);
    notification.notify("", "");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/users";
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${respObj.message || respObj.error}`);
      } else {
        notification.alertCancel("", "Signup success. Please check your email to complete signup.");
        setSignedup(true);
      }
    } catch (e) {
      notification.alertCancel("", e.message);
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SignupSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleSignup), children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center  ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: " text-[26px] font-[500]", children: /* @__PURE__ */ jsx("div", { className: "pb-1 border-b", children: "Signup" }) }),
    /* @__PURE__ */ jsxs("div", { className: `${signedup ? "hidden" : "block"}`, children: [
      /* @__PURE__ */ jsx("div", { className: " mt-6 text-[17px] leading-[1.2em]", children: "Enter your details below to continue." }),
      /* @__PURE__ */ jsxs("div", { className: " mt-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("email", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded-[5px] h-[50px] px-4",
            type: "text",
            placeholder: "Enter email address to login"
          }
        ),
        (errors == null ? void 0 : errors.email) && /* @__PURE__ */ jsx("div", { className: `text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`, children: (_a = errors == null ? void 0 : errors.email) == null ? void 0 : _a.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " mt-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded-[5px] h-[50px] px-4",
            type: "password",
            placeholder: "Enter password"
          }
        ),
        (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { className: `text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`, children: (_b = errors == null ? void 0 : errors.password) == null ? void 0 : _b.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " mt-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("first_name", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[1px] border-gray-100 focus:border-gray-300 focus:border-[1px]  bg-gray-100  rounded-[5px] h-[50px] px-4",
            type: "text",
            placeholder: "Enter firstname"
          }
        ),
        (errors == null ? void 0 : errors.first_name) && /* @__PURE__ */ jsx("div", { className: `text-sm text-red-500 ml-[1px]
                                leading-[1.2em] mt-1`, children: (_c = errors == null ? void 0 : errors.first_name) == null ? void 0 : _c.message })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " mt-3", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: `w-full bg-black text-white rounded-full 
                                h-[50px] px-4 cursor-pointer hover:bg-blue-700`,
          type: "submit",
          placeholder: "Enter email address to login",
          value: "Sign up"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: " mt-3 text-[11px]", children: "By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided." }),
      /* @__PURE__ */ jsxs("div", { className: `mt-1 flex place-content-between place-items-center`, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => window.location.href = "/signin",
            className: ` text-black bg-gray-100
                                px-5 py-1 border rounded-full border-black/40
                                hover:bg-blue-100 hover:shadow-lg hover:shadow-black/20`,
            children: "Sign In"
          }
        ),
        /* @__PURE__ */ jsx(Link, { to: `/resetpw`, children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: `underline`,
            children: "Forgot password?"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `${signedup ? "block" : "hidden"} mt-2`, children: [
      /* @__PURE__ */ jsx("b", { children: "Success!" }),
      " Please check your email to finish signup."
    ] })
  ] }) }) }) });
};
const Signup = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    /* @__PURE__ */ jsx(SignupForm, {})
  ] });
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Signup
}, Symbol.toStringTag, { value: "Module" }));
const SignupCodeForm = ({ data }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const notification = useNotification();
  const [working, setWorking] = useState(false);
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (data) {
      setEmail(data == null ? void 0 : data.email);
      setHash(data == null ? void 0 : data.hash);
    }
  }, [data]);
  const handleConfirm = (status) => {
    if (status === true) {
      window.location.href = "/signin";
    } else {
      notification.cancel();
    }
  };
  const handleVerify = async () => {
    notification.notify("Completing signup...");
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const data2 = [];
    data2["code"] = code;
    const BASE_URL = "https://gursse.com";
    const endpoint = `/api/users/verify_signup/${hash}`;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data2)
      });
      var respObj = await response.json();
      if (!response.ok) {
        throw new Error(`Error Code: ${response.status} - ${respObj.message}`);
      } else {
        notification.notify(respObj.message);
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        window.location.href = "/signin";
      }
    } catch (e) {
      notification.confirm(e.message, handleConfirm);
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const handleChange = (e) => {
    setCode(e.target.value.slice(0, 7));
  };
  const handleKeyDown = (e) => {
    const isNumber = /^[0-9]$/.test(e.key);
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"];
    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", {}),
    /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
      /* @__PURE__ */ jsxs("div", { className: " text-[20px] leading-[1.2em]", children: [
        "Enter the 7 digit code sent to: ",
        /* @__PURE__ */ jsx("span", { className: `text-[17px] font-normal text-gray-800`, children: email })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " mt-8 flex gap-2", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: "signup__code w-[180px] tracking-[.4em]",
          type: "text",
          maxLength: 7,
          onKeyDown: handleKeyDown,
          onChange: handleChange
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: " mt-4 text-[12px]", children: "Tip: Please check your inbox and spam folders" }),
      /* @__PURE__ */ jsx("div", { className: " mt-3", children: /* @__PURE__ */ jsx(
        "input",
        {
          className: `w-full bg-black text-white 
                                    rounded-[8px] h-[50px] px-4 cursor-pointer`,
          type: "button",
          placeholder: "Enter email address to login",
          value: "Continue",
          onClick: handleVerify
        }
      ) })
    ] }) }) })
  ] });
};
const loader$K = async ({ request, params }) => {
  const userHash = params.user_hash;
  const user = await getUserByUserHash(userHash);
  return user;
};
const Code = () => {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    data && /* @__PURE__ */ jsx(SignupCodeForm, { data })
  ] });
};
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Code,
  loader: loader$K
}, Symbol.toStringTag, { value: "Module" }));
const SignupCompleteForm = () => {
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 text-2xl leading-[1.2em] ", children: "Signup Complete" }),
    /* @__PURE__ */ jsx("div", { className: " w-[70px] h-[70px] bg-gray-300 flex place-content-center place-items-center rounded-full text-black  border-[5px] border-black text-3xl", children: /* @__PURE__ */ jsx(FaCheck, {}) }),
    /* @__PURE__ */ jsx("div", { className: " mt-16 text-[15px] ", children: "Click below to sign in." }),
    /* @__PURE__ */ jsx("div", { className: " mt-3", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/signin",
        className: " text-3xl mb-2 pb-1 border-b",
        children: "Sign in"
      }
    ) })
  ] }) }) });
};
const SignupComplete = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    /* @__PURE__ */ jsx(SignupCompleteForm, {})
  ] });
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SignupComplete
}, Symbol.toStringTag, { value: "Module" }));
const passwordValidation$2 = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);
const ResetPwFinalSchema = z.object({
  password: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be up to 8 characters." }).regex(passwordValidation$2, {
    message: "Please enter a valid password"
  }),
  password2: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation$2, {
    message: "Please enter a valid password"
  })
}).superRefine((data, ctx) => {
  if (data.password !== data.password2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password2"],
      message: "Your new password don't match"
    });
  }
});
const ResetPwFinal = ({ userGuid }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const { signin } = useAuth();
  const [working, setWorking] = useState(false);
  const [guid, setGuid] = useState("");
  const notification = useNotification();
  useEffect(() => {
    if (userGuid) {
      setGuid(userGuid);
    }
  }, [userGuid]);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSetPassword = async (data) => {
    setWorking(true);
    notification.notify("Resetting password...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    data.password;
    const BASE_URL = "https://gursse.com";
    const endpoint = `/api/users/reset_password/${guid}`;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      let rsp = response.json();
      if (!response.ok) {
        rsp.then((data2) => {
          notification.alertCancel("Failed", `${data2.message}`);
        });
      } else {
        rsp.then((data2) => {
          notification.notify(`${data2.message}. Redirecting...`);
          setTimeout(() => {
            window.location.href = "/signin";
          }, 3e3);
        });
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setWorking(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(ResetPwFinalSchema)
  });
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: " text-[26px] font-[500]", children: /* @__PURE__ */ jsx("div", { className: "pb-1 border-b", children: "Reset Password" }) }),
    /* @__PURE__ */ jsx("div", { className: " mt-4 mb-2 text-[15px] leading-[1.2em]", children: "Use the form below to set a new password for your account!" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleSetPassword), children: [
      /* @__PURE__ */ jsxs("div", { className: " mt-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px]  bg-gray-100  rounded-[8px] h-[50px] px-4",
            type: "password",
            placeholder: "Enter new password"
          }
        ),
        (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: (_a = errors == null ? void 0 : errors.password) == null ? void 0 : _a.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " mt-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password2", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px] bg-gray-100   rounded-[8px] h-[50px] px-4",
            type: "password",
            placeholder: "Retype New password"
          }
        ),
        (errors == null ? void 0 : errors.password2) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: (_b = errors == null ? void 0 : errors.password2) == null ? void 0 : _b.message })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `${working ? " bg-gray-500/70" : "cursor-pointer bg-black"} mt-3  w-full text-white rounded-[8px] h-[50px] px-4`,
          type: "submit",
          disabled: working,
          children: working ? "Submitting..." : "Set Password"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: " mt-3 text-[11px]", children: "By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided." })
  ] }) }) });
};
const loader$J = async ({ request, params }) => {
  const userGuid = params.user_guid || null;
  console.log(userGuid);
  const data = {
    userGuid
  };
  return data;
};
const resetpw = () => {
  const loaderData = useLoaderData();
  const userGuid = loaderData.userGuid;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    userGuid && /* @__PURE__ */ jsx(ResetPwFinal, { userGuid })
  ] });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: resetpw,
  loader: loader$J
}, Symbol.toStringTag, { value: "Module" }));
const ChangeEmailSuccess = ({ email }) => {
  return /* @__PURE__ */ jsx("div", { className: " flex place-content-center place-items-center w-screen h-screen", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-3 text-2xl leading-[1.2em] ", children: "Email Change Successful." }),
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: email }),
    /* @__PURE__ */ jsx("div", { className: " w-[70px] h-[70px] bg-gray-300 flex place-content-center place-items-center rounded-full text-black  border-[5px] border-black text-3xl", children: /* @__PURE__ */ jsx(FaCheck, {}) }),
    /* @__PURE__ */ jsx("div", { className: " mt-16 text-[15px] ", children: "Click below to sign in." }),
    /* @__PURE__ */ jsx("div", { className: " mt-3", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/signin",
        className: " text-3xl mb-2 pb-1 border-b",
        children: "Sign in"
      }
    ) })
  ] }) });
};
const ChangeEmailFail = ({ guid }) => {
  return /* @__PURE__ */ jsx("div", { className: " flex place-content-center place-items-center w-screen h-screen", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-8 text-2xl leading-[1.2em] ", children: "Email Change Expired." }),
    /* @__PURE__ */ jsx("div", { className: " w-[70px] h-[70px] bg-gray-300 flex place-content-center place-items-center rounded-full text-black  border-[5px]", children: /* @__PURE__ */ jsx(MdOutlineCancel, { className: "text-[70px]" }) }),
    /* @__PURE__ */ jsx("div", { className: " mt-16 text-[15px] ", children: "Try changing your email again." }),
    /* @__PURE__ */ jsx("div", { className: " mt-3", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/account/email/${guid}`,
        className: `text-2xl mb-2 pb-1 border-b
                            flex content-center items-center gap-2 hover:underline`,
        children: [
          /* @__PURE__ */ jsx("span", { children: "Go to Account" }),
          /* @__PURE__ */ jsx(BsArrowRight, { className: " relative top-[1px]" })
        ]
      }
    ) })
  ] }) });
};
const loader$I = async ({ request, params }) => {
  const url = new URL(request.url);
  let userGuid = url.searchParams.get("guid");
  let email = url.searchParams.get("email");
  const response = await changeEmail(userGuid, email);
  const data = {
    guid: userGuid,
    email,
    response
    //response
  };
  return DoResponse(data, 200);
};
const index$d = () => {
  const loaderData = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    loaderData.response === void 0 ? /* @__PURE__ */ jsx(ChangeEmailFail, { guid: loaderData.guid }) : /* @__PURE__ */ jsx(ChangeEmailSuccess, { email: loaderData.email })
  ] });
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$d,
  loader: loader$I
}, Symbol.toStringTag, { value: "Module" }));
const passwordValidation$1 = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);
const ResetPasswordSchema$1 = z.object({
  password: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be up to 8 characters." }).regex(passwordValidation$1, {
    message: "Please enter a valid password"
  }),
  password2: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation$1, {
    message: "Please enter a valid password"
  })
}).superRefine((data, ctx) => {
  if (data.password !== data.password2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password2"],
      message: "Your new password don't match"
    });
  }
});
const ResetPasswordForm$1 = ({ guid }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const { signin } = useAuth();
  const [working, setWorking] = useState(false);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSetPassword = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    data.password;
    const BASE_URL = "https://gursse.com";
    const endpoint = `/api/users/reset_password/${guid}`;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          alert(data2.message);
        });
      } else {
        alert("Password Successfully Changed! Use new password on next login");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    setWorking(false);
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(ResetPasswordSchema$1)
  });
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "h-screen w-screen bg-white  flex flex-col place-content-center place-items-center pt-16 ", children: /* @__PURE__ */ jsxs("div", { className: " max-w-[300px]", children: [
    /* @__PURE__ */ jsx("div", { className: " text-[26px] font-[500]", children: /* @__PURE__ */ jsx("div", { className: "pb-1 border-b", children: "Reset Password" }) }),
    /* @__PURE__ */ jsx("div", { className: " mt-4 mb-2 text-[15px] leading-[1.2em]", children: "Use the form below to set a new password for your account!" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(handleSetPassword), children: [
      /* @__PURE__ */ jsxs("div", { className: " mt-4", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px]  bg-gray-100  rounded-[8px] h-[50px] px-4",
            type: "password",
            placeholder: "Enter email address"
          }
        ),
        (errors == null ? void 0 : errors.password) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: (_a = errors == null ? void 0 : errors.password) == null ? void 0 : _a.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: " mt-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("password2", {
              onChange: changeHandler
            }),
            className: " w-full outline-none border-[2px] border-gray-100 focus:border-gray-300 focus:border-[2px] bg-gray-100   rounded-[8px] h-[50px] px-4",
            type: "password",
            placeholder: "Enter password"
          }
        ),
        (errors == null ? void 0 : errors.password2) && /* @__PURE__ */ jsx("div", { className: "ml-1 text-red-600 text-[13px]", children: (_b = errors == null ? void 0 : errors.password2) == null ? void 0 : _b.message })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `${working ? " bg-gray-500/70" : "cursor-pointer bg-black"} mt-3  w-full text-white rounded-[8px] h-[50px] px-4`,
          type: "submit",
          disabled: working,
          children: working ? "Submitting..." : "Set Password"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: " mt-3 text-[11px]", children: "By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Dersck and its affiliates to the email provided." })
  ] }) }) });
};
const loader$H = async ({ request, params }) => {
  new URL(request.url);
  let userGuid = params.guid;
  const data = {
    guid: userGuid
  };
  return DoResponse(data, 200);
};
const index$c = () => {
  const loaderData = useLoaderData();
  const userGuid = loaderData.guid;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(ResponsiveNav$1, {}),
    /* @__PURE__ */ jsx(ResetPasswordForm$1, { guid: userGuid })
  ] });
};
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$c,
  loader: loader$H
}, Symbol.toStringTag, { value: "Module" }));
const HeaderBar = ({ title }) => {
  return /* @__PURE__ */ jsxs("div", { className: " flex place-content-between w-full bg-blue-100/50 px-4 py-3 ", children: [
    /* @__PURE__ */ jsx("div", { className: `rounded-lg text-xl text-black font-normal
                 truncate mr-2`, children: title }),
    /* @__PURE__ */ jsxs("div", { className: " flex place-items-center gap-3  text-gray-500 font-light font-sans", children: [
      /* @__PURE__ */ jsxs("div", { className: " flex place-items-center gap-1 cursor-pointer", onClick: () => window.history.back(), children: [
        /* @__PURE__ */ jsx(MdArrowBack, {}),
        "Back"
      ] }),
      "|",
      /* @__PURE__ */ jsxs("div", { className: " flex place-items-center gap-1 cursor-pointer", onClick: () => window.history.go(1), children: [
        "Next",
        /* @__PURE__ */ jsx(MdArrowForward, {})
      ] })
    ] })
  ] });
};
const MenuLink = ({ menu }) => {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: menu.path,
      className: `text-[15px] text-black lowercase  px-[20px] py-[10px] flex items-center content-center gap-[10px] my-0 mx-[5px] rounded-[5px] hover:bg-gray-500/15 ${pathname === menu.path && "bg-blue-600/10"}`,
      children: [
        menu.icon,
        /* @__PURE__ */ jsx("span", { className: "first-letter:uppercase first-letter:font-bold font-sans first-letter:text-black", children: menu == null ? void 0 : menu.title })
      ]
    }
  );
};
const Sidebar = ({ user }) => {
  const menuItems = [
    {
      title: "Account",
      list: [
        {
          title: "Account",
          path: "/account",
          icon: /* @__PURE__ */ jsx(MdDashboard, {})
        },
        {
          title: "My Businesses",
          path: "/account/businesses",
          icon: /* @__PURE__ */ jsx(MdSupervisedUserCircle, {})
        },
        {
          title: "Add a Business",
          path: "/account/add-business",
          icon: /* @__PURE__ */ jsx(MdShoppingBag, {})
        }
      ]
    },
    {
      title: "Settings",
      list: [
        {
          title: "Profile",
          path: `/account/profile/${user == null ? void 0 : user.guid}`,
          icon: /* @__PURE__ */ jsx(MdOutlineSettings, {})
        },
        {
          title: "Email",
          path: `/account/email/${user == null ? void 0 : user.guid}`,
          icon: /* @__PURE__ */ jsx(MdEmail, {})
        },
        {
          title: "Change Password",
          path: `/account/change-password/${user == null ? void 0 : user.guid}`,
          icon: /* @__PURE__ */ jsx(MdLock, {})
        },
        {
          title: "Reset Password",
          path: `/account/reset-password/${user == null ? void 0 : user.guid}`,
          icon: /* @__PURE__ */ jsx(MdCable, {})
        },
        {
          title: "Deactivate User",
          path: `/account/deactivate-user/${user == null ? void 0 : user.guid}`,
          icon: /* @__PURE__ */ jsx(MdShoppingBag, {})
        }
      ]
    },
    {
      title: "Site Links",
      list: [
        {
          title: "Privacy",
          path: "/privacy",
          icon: /* @__PURE__ */ jsx(MdPrivacyTip, {})
        },
        {
          title: "Advertise",
          path: "/advertise",
          icon: /* @__PURE__ */ jsx(MdPrivacyTip, {})
        },
        {
          title: "Help",
          path: "/help",
          icon: /* @__PURE__ */ jsx(MdHelpCenter, {})
        },
        {
          title: "Sign out",
          path: "/signin",
          icon: /* @__PURE__ */ jsx(MdSecurity, {})
        }
      ]
    }
  ];
  return /* @__PURE__ */ jsx("ul", { className: " space-y-8", children: menuItems.map((cat, index2) => {
    return /* @__PURE__ */ jsxs("li", { className: "bg-white/50 rounded-[8px] pb-3 ", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: " text-black font-normal text-[16px]  mb-2  px-5 py-2 tracking-[.01em]",
          children: cat.title
        }
      ),
      cat.list && /* @__PURE__ */ jsx("div", { children: cat.list.map((item, index22) => {
        return /* @__PURE__ */ jsx(
          MenuLink,
          {
            menu: item
          },
          index22
        );
      }) })
    ] }, index2);
  }) });
};
const ProfileLayout = ({ children, title }) => {
  const auth = useAuth();
  useNavigate$1();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);
  useEffect(() => {
    let tokens = localStorage.getItem("authTokens");
    if (tokens === null || tokens === void 0) {
      window.location.href = "/signin";
    }
  }, [loading]);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    ProfileLayoutContent,
    {
      user: auth.user,
      children,
      title
    }
  ) });
};
const ProfileLayoutContent = ({ user, children, title }) => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[100vh] bg-blue-50", children: [
    /* @__PURE__ */ jsx(ResponsiveNav$2, {}),
    /* @__PURE__ */ jsx("div", { className: " h-[70px] flex flex-col place-items-start place-content-end" }),
    /* @__PURE__ */ jsx("div", { className: `mt-16 flex items-center h-full justify-between 
                w-[95%] sm:w-[90%] xl:w-[80%] mx-auto`, children: /* @__PURE__ */ jsxs("div", { className: " grid grid-cols-12 gap-8 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: " hidden lg:block lg:col-span-3 w-full", children: /* @__PURE__ */ jsx(Sidebar, { user }) }),
      /* @__PURE__ */ jsxs("div", { className: `col-span-12 lg:col-span-9 bg-white/50 
                        w-full p-3 rounded-[12px] pb-20 `, children: [
        /* @__PURE__ */ jsx(HeaderBar, { title }),
        children
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
const BusinessRow = ({ user, business, id }) => {
  const businessLink = `/account/businesses/${business.gid}/${user == null ? void 0 : user.guid}`;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Link, { to: businessLink, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 border hover:bg-gray-200/70 p-3 mb-1 rounded place-content-center text-[14px] gap-1", children: [
    /* @__PURE__ */ jsx("div", { className: " col-span-1 flex place-items-center ", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate", children: Number.parseInt(id) + 1 }) }),
    /* @__PURE__ */ jsx("div", { className: " col-span-4 flex place-items-center truncate", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate ", children: business.title }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:col-span-2 md:flex place-items-center   ", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate", children: business.category }) }),
    /* @__PURE__ */ jsx("div", { className: " col-span-4 md:col-span-2 flex place-items-center truncate", children: business.country_code }),
    /* @__PURE__ */ jsx("div", { className: " col-span-2 md:col-span-2 flex place-items-center ", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate capitalize", children: Boolean(business == null ? void 0 : business.active_status) ? "Active" : "Inactive" }) }),
    /* @__PURE__ */ jsx("div", { className: " col-span-1 flex bg-red-200 place-content-end place-items-center", children: /* @__PURE__ */ jsx("div", { className: " bg-blue-700 w-full text-white py-1 text-center rounded-md cursor-pointer", children: "GO" }) })
  ] }) }) });
};
const Businesses = ({ user, businesses }) => {
  return /* @__PURE__ */ jsxs("div", { className: "tbl__class", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 border bg-gray-200/50 hover:bg-gray-200/70 p-3 mb-1 rounded place-content-center text-[14px] gap-1 font-bold", children: [
      /* @__PURE__ */ jsx("div", { className: " col-span-1 flex place-items-center ", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate", children: "ID" }) }),
      /* @__PURE__ */ jsx("div", { className: " col-span-4 flex place-items-center truncate", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate ", children: "Title" }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:col-span-2 md:flex place-items-center   ", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate", children: "Category" }) }),
      /* @__PURE__ */ jsx("div", { className: " col-span-4 md:col-span-2 flex place-items-center truncate", children: "Country" }),
      /* @__PURE__ */ jsx("div", { className: " col-span-1 md:col-span-2 flex place-items-center", children: /* @__PURE__ */ jsx("div", { className: " w-[95%] truncate", children: "Status" }) }),
      /* @__PURE__ */ jsx("div", { className: " col-span-1 flex place-content-end place-items-center", children: " " })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "", children: businesses.success ? businesses.data.map((business, index2) => {
      return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(BusinessRow, { user, business, id: index2 }) }, index2);
    }) : /* @__PURE__ */ jsx(
      "div",
      {
        onClick: () => window.location.href = `/account/add-business`,
        className: `flex justify-center items-center
                        h-[200px] bg-blue-50 border cursor-pointer`,
        children: "Add a business"
      }
    ) })
  ] });
};
const index$b = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const [names, setNames] = useState("");
  const getBusinesses = async (guid) => {
    try {
      const SITE_BASE_URL2 = "https://gursse.com";
      let businessesEndpoint = `/api/listings/owner/${guid}`;
      let bep = SITE_BASE_URL2 + businessesEndpoint;
      const response = await fetch(bep, {
        method: "GET",
        headers
      });
      if (response.status !== 200) {
        console.log("error fetching businesses");
        console.log(await response.json());
      }
      const data = await response.json();
      setBusinesses(data);
      console.log(data);
    } catch (error) {
      let response = GetResponse({ error: error.message }, false, 200);
      console.log(error.message);
      setBusinesses(response);
      return null;
    }
  };
  useEffect(() => {
    if (user) {
      getBusinesses(user.guid);
      let names2 = (user == null ? void 0 : user.first_name) + " " + (user == null ? void 0 : user.last_name);
      setNames(names2);
    }
  }, [user]);
  return /* @__PURE__ */ jsx(ProfileLayout, { title: `Welcome, ${names}`, children: user && businesses && /* @__PURE__ */ jsx(Businesses, { user, businesses }) });
};
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$b
}, Symbol.toStringTag, { value: "Module" }));
const AddBusinessSchema = z.object({
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  category: z.string().min(1, { message: "Please select a business category." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  state_code: z.any(),
  city_id: z.any(),
  zipcode: z.string().min(1, { message: "Zipcode must not be empty" }).max(7, { message: "Zipcode must not be more than 7 characters" }),
  short_description: z.string({ message: "Please enter business phrase" }).min(3, { message: "Short Description must not be less than 3 characters" }).max(1e3, { message: "Short Description must not be more than 1000 characters" }),
  email_address: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Phone must not be empty" }).max(30, { message: "PHone must not be more than 30 characters" }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  address_two: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" })
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const Input = ({
  controlName,
  controlType,
  controlPlaceholder,
  controlTitle,
  register,
  changeHandler,
  error,
  width,
  disabled = false
}) => {
  const [wrapperWidth, setWrapperWidth] = useState("");
  const [inputWidth, setInputWidth] = useState(width);
  useEffect(() => {
    if (inputWidth > 0) {
      if (inputWidth === 100) {
        setWrapperWidth(`xl:w-full`);
      } else {
        setWrapperWidth(`xl:w-[${inputWidth}%]`);
      }
    }
  }, [inputWidth]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
    /* @__PURE__ */ jsx("div", { className: "input__heading__class", children: controlTitle }),
    /* @__PURE__ */ jsxs("div", { className: `w-[100%] sm:w-[70%] md:w-[65%] lg:w-[60%] ${wrapperWidth}`, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ...register(controlName, {
            onChange: changeHandler
          }),
          type: controlType ? controlType : "text",
          className: `input__class ${disabled && "bg-gray-200/80"}`,
          placeholder: controlPlaceholder,
          disabled
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const Select = ({
  controlName,
  controlTitle,
  controlPlaceholder,
  selectJson,
  register,
  changeHandler,
  error,
  setCode
}) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (register && changeHandler && selectJson) {
      setTimeout(() => {
        setReady(true);
      }, 1e3);
    }
  }, [register, changeHandler, selectJson]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
    /* @__PURE__ */ jsx("div", { className: "input__heading__class", children: controlTitle }),
    /* @__PURE__ */ jsxs("div", { className: "input__control__wrapper", children: [
      ready && /* @__PURE__ */ jsxs(
        "select",
        {
          ...register(controlName, {
            onChange: (e) => {
              changeHandler(e);
              if (setCode) {
                setCode(e.target.value);
              }
            }
          }),
          className: "input__class",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: controlPlaceholder }),
            selectJson.map((item, id) => {
              return /* @__PURE__ */ jsx("option", { value: item.id, children: item.name }, id);
            })
          ]
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const Button = ({
  working,
  value
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `input__button__class ${working && "bg-blue-500 cursor-default"}`,
        disabled: working,
        children: working ? "Submitting..." : `${value ? value : "Submit"}`
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: " mt-4 text-[.7em] leading-[1.2em] px-2 w-full sm:w-[70%] md:w-[65%] lg:w-[60%] xl:w-[40%]", children: "By submitting, you agree to our Privacy Commitment and Terms of Service." })
  ] }) });
};
const Textarea = ({
  controlName,
  controlPlaceholder,
  controlTitle,
  register,
  changeHandler,
  error
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "textarea__wrapper_class", children: [
    /* @__PURE__ */ jsx("div", { className: "input__heading__class", children: controlTitle }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          ...register(controlName, {
            onChange: changeHandler
          }),
          className: "textarea__class",
          placeholder: controlPlaceholder
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error -mt-[5px]`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const AddBusinessForm = ({ loaderData, user }) => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const countries = loaderData.countries;
  let [states, setStates] = useState(loaderData.states);
  let [cities, setCities] = useState(loaderData.cities);
  const categories = loaderData.categories.data;
  const [countryCode, setCountryCode] = useState(loaderData.listing.country_code);
  const [stateCode, setStateCode] = useState(loaderData.listing.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleAddBusiness = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    data["owner"] = user.guid;
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/listings";
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${respObj.error}`);
      } else {
        alert("Successfully added!");
      }
    } catch (e) {
      alert(e.message);
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(AddBusinessSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleAddBusiness), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class", children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Business Name",
        controlPlaceholder: "Enter business name",
        controlName: "title",
        register,
        changeHandler,
        error: errors.title,
        width: 80
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Email Address",
        controlPlaceholder: "Enter email address",
        controlName: "email_address",
        register,
        changeHandler,
        error: errors.email_address
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Business Category",
        controlName: "category",
        controlPlaceholder: "Select business category",
        selectJson: categories,
        register,
        changeHandler,
        error: errors.category
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Year established",
        controlPlaceholder: "Enter year established",
        controlName: "established",
        register,
        changeHandler,
        error: errors.established
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "Country",
        controlName: "country_code",
        controlPlaceholder: "Select country",
        selectJson: countries,
        register,
        changeHandler,
        error: errors.country_code,
        setCode: resetStates
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "State",
        controlName: "state_code",
        controlPlaceholder: "Select state",
        selectJson: states,
        register,
        changeHandler,
        error: errors.state_code,
        setCode: resetCities
      }
    ),
    /* @__PURE__ */ jsx(
      Select,
      {
        controlTitle: "City",
        controlName: "city_id",
        controlPlaceholder: "Select city",
        selectJson: cities,
        register,
        changeHandler,
        error: errors.city_id
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Address 1",
        controlPlaceholder: "Enter address",
        controlName: "address_one",
        register,
        changeHandler,
        error: errors.address_one,
        width: 100
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Address 2",
        controlPlaceholder: "Enter address",
        controlName: "address_two",
        register,
        changeHandler,
        error: errors.address_two,
        width: 100
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Zipcode",
        controlPlaceholder: "Enter zipcode",
        controlName: "zipcode",
        register,
        changeHandler,
        error: errors.zipcode
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Phone number",
        controlPlaceholder: "Enter phone number",
        controlName: "phone",
        register,
        changeHandler,
        error: errors.phone
      }
    ),
    /* @__PURE__ */ jsx(
      Textarea,
      {
        controlTitle: "Description",
        controlPlaceholder: "Shotrt description",
        controlName: "short_description",
        register,
        changeHandler,
        error: errors.short_description
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) });
};
const loader$G = async ({ request, params }) => {
  const guid = params.guid;
  const listing = await getQuery$1(guid || "");
  const countries = await getCountries();
  const listingObject = listing;
  const states = await getStates(listingObject.country_code || "");
  const cities = await getCities(listingObject.country_code || "", listingObject.state_code || "");
  const categories = await getCategories();
  const data = {
    guid,
    listing,
    countries,
    states,
    cities,
    categories
  };
  return DoResponse(data, 200);
};
const index$a = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  console.log(user);
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Add Business", children: loaderData && /* @__PURE__ */ jsx(AddBusinessForm, { loaderData, user }) });
};
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$a,
  loader: loader$G
}, Symbol.toStringTag, { value: "Module" }));
const loader$F = async ({ request, params }) => {
  return { guid: null };
};
const SITE_BASE_URL = "https://gursse.com";
const index$9 = () => {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState([]);
  const getBusinesses = async (guid) => {
    try {
      let businessesEndpoint = `/api/listings/owner/${guid}`;
      let bep = SITE_BASE_URL + businessesEndpoint;
      const response = await fetch(bep, {
        method: "GET",
        headers
      });
      if (response.status !== 200) {
        console.log("error fetching businesses");
        console.log(await response.json());
      }
      const data = await response.json();
      setBusinesses(data);
    } catch (error) {
      let response = GetResponse({ error: error.message }, false, 200);
      console.log(error.message);
      setBusinesses(response);
      return null;
    }
  };
  useEffect(() => {
    if (user) {
      getBusinesses(user.guid);
    }
  }, [user]);
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Businesses", children: user && businesses && /* @__PURE__ */ jsx(Businesses, { user, businesses }) });
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$9,
  loader: loader$F
}, Symbol.toStringTag, { value: "Module" }));
const settingsLinks = [
  {
    title: "Settings",
    link: "/settings"
  },
  {
    title: "Gallery",
    link: "/gallery"
  },
  {
    title: "Facilities",
    link: "/facilities"
  },
  {
    title: "Activate",
    link: "/activate"
  }
];
const BusinessMenu = ({ title, guid, userGuid }) => {
  const [showSettings, setShowSettings] = useState(false);
  const displaySettings = () => setShowSettings(true);
  useLocation();
  const pathname = `/account/businesses/${guid}/${userGuid}`;
  const hideSettings = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowSettings(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: " flex place-content-between w-full  px-4 py-3 mt-1 z-[3000]", children: [
    /* @__PURE__ */ jsx("div", { className: "  rounded-lg text-xl text-black font-normal", children: title }),
    /* @__PURE__ */ jsxs("div", { className: `relative flex flex-col place-items-center place-content-end 
                bg-blue-200 w-[180px]  gap-3  text-gray-500 font-light font-sans
                z-[100]`, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: `rounded-md cursor-pointer w-full bg-blue-900
                         text-white shadow-md shadow-blue-400 py-1`,
          onMouseDown: () => displaySettings(),
          onBlur: () => hideSettings(),
          children: "Settings"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `${showSettings ? "block" : "hidden"} absolute w-full top-8 rounded-lg 
                border-[1px] border-gray-100 bg-white shadow-lg  `, children: /* @__PURE__ */ jsx("div", { className: "divide-y-[1px] divide-gray-500/30 ", children: settingsLinks.map((item, index2) => {
        return /* @__PURE__ */ jsx("div", { className: `py-2.5 px-3 text-[14px]
                                     text-black font-sans font-semibold `, children: /* @__PURE__ */ jsx(Link, { to: `${pathname}${item.link}`, children: /* @__PURE__ */ jsx("p", { children: item.title }) }) }, index2);
      }) }) })
    ] })
  ] });
};
const BusinessSchema = z.object({
  username: z.any(),
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  short_description: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 30;
    },
    { message: "You must write at least 30 words." }
  ).refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 50;
    },
    { message: "You can only write up to 50 words." }
  ),
  long_description: z.string().refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length >= 100;
    },
    { message: "You must write at least 100 words." }
  ).refine(
    (val) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      return words.length <= 500;
    },
    { message: "You can only write up to 500 words." }
  ),
  address_two: z.any(),
  state_code: z.any(),
  state_text: z.any(),
  country_text: z.any(),
  city_id: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" }),
  call_code: z.any(),
  phone: z.any(),
  zipcode: z.any(),
  intro: z.any(),
  category: z.string().min(2, { message: "Please select a business category" }),
  business_phrases: z.union([
    z.literal(""),
    z.string({ message: "Please enter business phrase" }).min(3, { message: "Business Phrases must not be less than 3 characters" }).max(1e3, { message: "Business Phrases must not be more than 100 characters" }).nullish()
  ]),
  products: z.any(),
  services: z.any(),
  xsocial: z.any(),
  fbsocial: z.any(),
  linksocial: z.any(),
  website: z.union(
    [
      z.string().url().nullish(),
      z.literal("")
    ]
  )
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const ImgComponent$1 = ({ listing, user, businessProfileImageData }) => {
  const IMG_BASE_URL2 = "https://oxbyt.com";
  let imgconst = "";
  if (businessProfileImageData.image_url) {
    imgconst = IMG_BASE_URL2 + businessProfileImageData.image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    notification.notify("Working...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      formData.append("bid", listing.gid);
      const IMG_BASE_URL22 = "https://oxbyt.com";
      const endpoint = "/business_profile_pic_upload";
      const url = IMG_BASE_URL22 + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            notification.alertCancel("", data.message);
          });
        } else {
          notification.alertReload("", "Image uploaded successfully!");
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      notification.alertCancel("", "Please select an image to continue.");
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-blue-100 w-[150px] h-[150px] z-40 rounded-full overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "Click to upload",
          className: " object-cover w-full h-full z-0 absolute"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                 text-white/80 `,
          onMouseDown: handleImageClick,
          children: /* @__PURE__ */ jsx("div", { className: `w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` flex flex-col place-items-center 
                place-content-center mt-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `${working ? "bg-gray-200 cursor-default" : "bg-blue-100"}  w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`,
        onMouseDown: handleUpload,
        disabled: working,
        children: working ? "Uploading..." : "Upload"
      }
    ) })
  ] });
};
const TextareaWithWordLimit = ({
  controlName,
  controlPlaceholder,
  controlTitle,
  register,
  changeHandler,
  error,
  setValue,
  getValues,
  watch,
  minWords = 100,
  maxWords = 500
}) => {
  const [text, setText] = useState("");
  const [wordLimitReached, setWordLimitReached] = useState(false);
  const countWords = (input) => {
    return (input == null ? void 0 : input.trim()) === "" ? 0 : input == null ? void 0 : input.trim().split(/\s+/).length;
  };
  const handleTextChange = (e) => {
    const input = e.target.value;
    const words = input.trim().split(/\s+/);
    if (words.length <= maxWords) {
      setValue("text", input);
      setWordLimitReached(false);
    } else {
      setWordLimitReached(true);
      const trimmedWords = words.slice(0, maxWords).join(" ");
      setValue("text", trimmedWords);
    }
  };
  const textValue = watch("text") || "";
  const handleKeyDown = (e) => {
    const words = textValue.trim().split(/\s+/);
    if (words.length >= maxWords && e.key !== "Backspace" && e.key !== "Delete" && !e.ctrlKey) {
      e.preventDefault();
      setWordLimitReached(true);
    } else {
      setWordLimitReached(false);
    }
  };
  useEffect(() => {
    if (controlName) {
      let priorText = getValues(controlName);
      setText(priorText);
    }
  }, [controlName]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "textarea__wrapper_class", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex place-content-between", children: [
      /* @__PURE__ */ jsx("label", { className: "block mb-1 text-md font-semibold", children: controlTitle }),
      /* @__PURE__ */ jsxs("label", { className: " text-gray-600 text-sm", children: [
        "Word Count: ",
        /* @__PURE__ */ jsx("strong", { children: countWords(text) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          ...register(controlName, {
            onChange: (e) => {
              setText(e.target.value);
              handleTextChange(e);
              changeHandler(e);
            }
          }),
          className: "textarea__class",
          placeholder: controlPlaceholder,
          onKeyDown: handleKeyDown
        }
      ),
      error && /* @__PURE__ */ jsxs("div", { className: `input__class__error -mt-[5px]`, children: [
        /* @__PURE__ */ jsx(MdError, { className: "text-lg" }),
        error.message
      ] })
    ] })
  ] }) });
};
const BusinessForm = ({ loaderData, userProfileData }) => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const countries = loaderData.countries;
  let [states, setStates] = useState(loaderData.states);
  let [cities, setCities] = useState(loaderData.cities);
  const categories = loaderData.categories.data;
  const [countryCode, setCountryCode] = useState(loaderData.listing.country_code);
  const [stateCode, setStateCode] = useState(loaderData.listing.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleAddBusiness = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/listings/" + loaderData.listing.gid;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        alert("Could not update. Try again!");
      } else {
        alert("Successfully updated!");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(BusinessSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode, loaderData]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "form__wrapper__class", children: /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class flex flex-col place-items-center md:place-items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "input__heading__class", children: "Add/Change Photo" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
        ImgComponent$1,
        {
          listing: loaderData.listing,
          user: userProfileData,
          businessProfileImageData: loaderData.businessProfileImageData
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleAddBusiness), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Username",
          controlPlaceholder: "Enter username",
          controlName: "username",
          register,
          changeHandler,
          error: errors.username
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Business name",
          controlPlaceholder: "Enter business name",
          controlName: "title",
          register,
          changeHandler,
          error: errors.title
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Year established",
          controlPlaceholder: "Enter year established",
          controlName: "established",
          register,
          changeHandler,
          error: errors.established
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "Country",
          controlName: "country_code",
          controlPlaceholder: "Select country",
          selectJson: countries,
          register,
          changeHandler,
          error: errors.country_code,
          setCode: resetStates
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "State",
          controlName: "state_code",
          controlPlaceholder: "Select state",
          selectJson: states,
          register,
          changeHandler,
          error: errors.state_code,
          setCode: resetCities
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "City",
          controlName: "city_id",
          controlPlaceholder: "Select city",
          selectJson: cities,
          register,
          changeHandler,
          error: errors.city_id
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address 1",
          controlPlaceholder: "Enter address",
          controlName: "address_one",
          register,
          changeHandler,
          error: errors.address_one,
          width: 100
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address 2",
          controlPlaceholder: "Enter address",
          controlName: "address_two",
          register,
          changeHandler,
          error: errors.address_two,
          width: 100
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Zipcode",
          controlPlaceholder: "Enter zipcode",
          controlName: "zipcode",
          register,
          changeHandler,
          error: errors.zipcode
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Phone number",
          controlPlaceholder: "Enter phone number",
          controlName: "phone",
          register,
          changeHandler,
          error: errors.phone
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "Category",
          controlName: "category",
          controlPlaceholder: "Select category",
          selectJson: categories,
          register,
          changeHandler,
          error: errors.category
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Business Phrases",
          controlPlaceholder: "E.g. Advocates, Software Developers, Architect",
          controlName: "business_phrases",
          register,
          changeHandler,
          error: errors.business_phrases
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Products",
          controlPlaceholder: "Enter products",
          controlName: "products",
          register,
          changeHandler,
          error: errors.products
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Services",
          controlPlaceholder: "Enter services",
          controlName: "services",
          register,
          changeHandler,
          error: errors.services
        }
      ),
      /* @__PURE__ */ jsx(
        TextareaWithWordLimit,
        {
          controlTitle: "Short Description",
          controlPlaceholder: "Short description",
          controlName: "short_description",
          register,
          changeHandler,
          error: errors.short_description,
          setValue,
          getValues,
          watch
        }
      ),
      /* @__PURE__ */ jsx(
        TextareaWithWordLimit,
        {
          controlTitle: "Long Description",
          controlPlaceholder: "Long description",
          controlName: "long_description",
          register,
          changeHandler,
          error: errors.long_description,
          setValue,
          getValues,
          watch
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Twitter",
          controlPlaceholder: "@handle",
          controlName: "xsocial",
          register,
          changeHandler,
          error: errors.address
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Facebook",
          controlPlaceholder: "@handle",
          controlName: "fbsocial",
          register,
          changeHandler,
          error: errors.fbsocial
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "LinkedIn",
          controlPlaceholder: "https://linkedin.com/company/username",
          controlName: "linksocial",
          register,
          changeHandler,
          error: errors.linksocial
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Website",
          controlPlaceholder: "Enter website",
          controlName: "website",
          register,
          changeHandler,
          error: errors.website
        }
      ),
      /* @__PURE__ */ jsx(Button, { working })
    ] }) })
  ] });
};
const loader$E = async ({ request, params }) => {
  const guid = params.guid;
  const userGuid = params.user_guid;
  const userProfileData = await getUserProfile(userGuid || "");
  const businessProfileImageData = await getBusinessProfileImageData(guid || "");
  const listing = await getQuery$1(guid || "");
  const countries = await getCountries();
  const listingObject = listing;
  const states = await getStates(listingObject.country_code || "");
  const cities = await getCities(listingObject.country_code || "", listingObject.state_code || "");
  const categories = await getCategories();
  const data = {
    guid,
    listing,
    countries,
    states,
    cities,
    categories,
    userProfileData,
    businessProfileImageData
  };
  return DoResponse(data, 200);
};
const index$8 = () => {
  const loaderData = useLoaderData();
  const guid = loaderData.guid;
  const userProfileData = loaderData.userProfileData;
  const userGuid = userProfileData.user_guid;
  return /* @__PURE__ */ jsxs(ProfileLayout, { title: "Edit Business", children: [
    guid && userGuid && /* @__PURE__ */ jsx(BusinessMenu, { guid, userGuid }),
    loaderData && /* @__PURE__ */ jsx(BusinessForm, { loaderData, userProfileData })
  ] });
};
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$8,
  loader: loader$E
}, Symbol.toStringTag, { value: "Module" }));
const urlvalidator = /^(?!https?)(?!www\.?).*\..+$/g;
const SettingsSchema = z.object({
  username: z.any(),
  title: z.string().min(1, { message: "Enter a business name" }).min(3, { message: "Busines Name must not be less than 3 characters" }).max(100, { message: "Business name must not be more than 100 characters." }),
  country_code: z.string({ message: "Please select a country" }).min(1, { message: "Please enter a country code." }),
  address_one: z.string({ message: "Please enter an address" }).min(3, { message: "Address must not be less than 3 characters" }).max(100, { message: "Address must not be more than 100 characters" }),
  address_two: z.any(),
  state_code: z.any(),
  state_text: z.any(),
  country_text: z.any(),
  city: z.any(),
  established: z.string({ message: "Please enter year established" }).min(4, { message: "Year must be at least 4 characters" }),
  call_code: z.any(),
  call_mobile: z.any(),
  zipcode: z.any(),
  intro: z.any(),
  category: z.string().min(2, { message: "Please select a business category" }),
  business_phrases: z.string({ message: "Please enter business phrase" }).min(3, { message: "Business Phrases must not be less than 3 characters" }).max(1e3, { message: "Business Phrases must not be more than 100 characters" }),
  products: z.string({ message: "Please enter products offered" }),
  services: z.union([
    z.string({ message: "Please enter services offered" }).min(3, { message: "Please enter up to 3 characters" }),
    z.literal("")
  ]),
  xsocial: z.any(),
  fbsocial: z.any(),
  linksocial: z.any(),
  website: z.union(
    [
      z.string().regex(urlvalidator).nullish(),
      z.literal("")
    ]
  ),
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
}).superRefine((data, ctx) => {
  var _a, _b;
  if (((_a = data == null ? void 0 : data.address_two) == null ? void 0 : _a.length) !== 0) {
    if (((_b = data == null ? void 0 : data.address_two) == null ? void 0 : _b.length) < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["address_two"],
        message: "Enter a minimum of 3 characters"
      });
    }
  }
});
const timeOptions = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00"
];
const BusinessWorkingHours = ({
  data,
  onChange,
  options
}) => {
  const [workingHours, setWorkingHours] = useState(null);
  const [openStatus, setOpenStatus] = useState("no_hours");
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const getWorkingHours = async (operatingHours) => {
    const hours = operatingHours;
    return {
      Monday: { start: hours.monday_from, end: hours.monday_to },
      Tuesday: { start: hours.tuesday_from, end: hours.tuesday_to },
      Wednesday: { start: hours.wednesday_from, end: hours.wednesday_to },
      Thursday: { start: hours.thursday_from, end: hours.thursday_to },
      Friday: { start: hours.friday_from, end: hours.friday_to },
      Saturday: { start: hours.saturday_from, end: hours.saturday_to },
      Sunday: { start: hours.sunday_from, end: hours.sunday_to }
    };
  };
  useEffect(() => {
    const loadHours = async () => {
      const hours = await getWorkingHours(data.operatingHours);
      setWorkingHours(hours);
      onChange(hours);
      setOpenStatus(data.operatingHours.open_status);
    };
    loadHours();
  }, [data.operatingHours]);
  const handleTimeChange = (day, type, value) => {
    if (!workingHours) return;
    const startTime = type === "start" ? value : workingHours[day].start;
    const endTime = type === "end" ? value : workingHours[day].end;
    if (endTime <= startTime) {
      alert(`For ${day}, closing time must be later than opening time.`);
      return;
    }
    setWorkingHours({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [type]: value
      }
    });
    onChange(workingHours);
  };
  const handleSave = async () => {
    if (openStatus === null) {
      notification.alert("", "Please select working hours.");
      return false;
    }
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const response = await saveOperatingHours(openStatus, workingHours, data.businessGuid, data.userGuid);
      if (response === void 0) {
        notification.alert("", "Save not successful!");
      }
    } catch (error) {
      notification.alert("", error.message);
    } finally {
      setWorking(false);
      notification.alert("", "Save successful!");
    }
  };
  if (!workingHours) return /* @__PURE__ */ jsx("p", { children: "Loading working hours..." });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: `w-full`, children: options.map((option) => /* @__PURE__ */ jsxs(
      "label",
      {
        className: `flex items-center gap-3 p-3 rounded cursor-pointer ${openStatus === option.value ? " bg-blue-50" : "border-gray-300"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: `w-[20px]`, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "radio",
              name: "openStatus",
              value: option.value,
              checked: openStatus === option.value,
              onChange: () => setOpenStatus(option.value),
              className: `accent-blue-600 w-[20px] h-[20px]`
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: `flex flex-col`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: option.label }),
            /* @__PURE__ */ jsx("span", { className: `text-[13px] text-gray-500`, children: option.more })
          ] })
        ]
      },
      option.value
    )) }),
    openStatus === "selected_hours" && Object.keys(workingHours).map((day) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("span", { className: "w-24 font-semibold", children: day }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: workingHours[day].start,
          onChange: (e) => handleTimeChange(day, "start", e.target.value),
          className: "border p-2 rounded-md",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "From..." }),
            timeOptions.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
          ]
        }
      ),
      /* @__PURE__ */ jsx("span", { children: "to" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: workingHours[day].end,
          onChange: (e) => handleTimeChange(day, "end", e.target.value),
          className: "border p-2",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "To..." }),
            timeOptions.map((time) => /* @__PURE__ */ jsx("option", { value: time, children: time }, time))
          ]
        }
      )
    ] }, day)),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSave,
        className: `mt-6 bg-blue-600 text-white px-6 py-2 
                            rounded hover:bg-blue-700 transition
                            shadow-md hover:shadow-lg hover:shadow-black/50`,
        children: working ? "Saving..." : "Save Business Hours"
      }
    ) })
  ] });
};
const loader$D = async ({ request, params }) => {
  const businessGuid = params.business_guid || null;
  const userGuid = params.user_guid || null;
  const operatingHours = await getOperatingHours(businessGuid, userGuid);
  const data = {
    businessGuid,
    userGuid,
    operatingHours
  };
  console.log(data);
  return data;
};
const index$7 = () => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const loaderData = useLoaderData$1();
  const [workingHours, setWorkingHours] = useState([]);
  const options = [
    { value: "no_hours", label: "No Hours Available", more: "Visitors won't see business hours on this Page" },
    { value: "always_open", label: "Always Open", more: "e.g. Parks, beaches, roads" },
    { value: "permanently_closed", label: "Permanently Closed", more: "Permantently closed" },
    { value: "temporarily_closed", label: "Temporarily Closed", more: "Temporarily closed" },
    { value: "selected_hours", label: "Open During Selected Hours", more: "Open during selected hours" }
  ];
  const userGuid = loaderData.userGuid;
  const businessGuid = loaderData.businessGuid;
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {},
    resolver: zodResolver(SettingsSchema)
  });
  return /* @__PURE__ */ jsxs(ProfileLayout, { title: "Edit Settings", children: [
    /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    /* @__PURE__ */ jsx("div", { className: "form__wrapper__class ", children: loaderData && /* @__PURE__ */ jsx("div", { className: `mt-6`, children: /* @__PURE__ */ jsx(
      BusinessWorkingHours,
      {
        data: loaderData,
        onChange: setWorkingHours,
        options
      }
    ) }) })
  ] });
};
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$7,
  loader: loader$D
}, Symbol.toStringTag, { value: "Module" }));
const GalleryItemMenu = ({
  item,
  menu,
  userGuid,
  businessGuid
}) => {
  const [dialog, setDialog] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const editPhoto = useEditPhotoDialogContext();
  const notification = useNotification();
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const handleOpenDialog = () => {
    editPhoto.setDialog(true);
    editPhoto.setImgSrc(IMG_BASE_URL2 + item.image_url);
    editPhoto.setImageTitle(item.image_title);
    editPhoto.setUserGuid(userGuid);
    editPhoto.setBusinessGuid(businessGuid);
    editPhoto.setImageGuid(item.image_guid);
    setDialog(true);
  };
  const handleDelete = async () => {
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    editPhoto.deletePhoto(userGuid, businessGuid, item.image_guid);
  };
  return /* @__PURE__ */ jsx("div", { className: "", children: menu && /* @__PURE__ */ jsx("div", { className: ` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`, children: /* @__PURE__ */ jsx("div", { className: `mt-3`, children: /* @__PURE__ */ jsxs("div", { className: ` divide-y-[1px]`, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleOpenDialog,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Edit"
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        onMouseDown: handleDelete,
        className: `py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`,
        children: "Delete"
      }
    )
  ] }) }) }) });
};
const GalleryItem = ({
  showCarousel,
  item,
  itemIndex,
  userGuid,
  businessGuid
}) => {
  const [menu, setMenu] = useState(false);
  const IMG_BASE_URL2 = "https://oxbyt.com";
  let imgconst = "";
  if (item.image_url) {
    imgconst = IMG_BASE_URL2 + item.image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const showMenu = () => {
    setMenu(true);
  };
  const hideMenu = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setMenu(false);
  };
  return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border-[1px] h-fit p-1 rounded-md shadow-md
                    hover:cursor-pointer relative z-0`,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onMouseDown: showMenu,
            onBlur: hideMenu,
            className: `w-[30px] h-[30px] z-50 bg-white 
                flex place-content-center place-items-center 
                rounded-full absolute right-2 top-2 cursor-pointer
                hover:bg-gray-500 hover:text-white/80 transition duration-1000 ease-in-out`,
            children: /* @__PURE__ */ jsx(BiEditAlt, { className: `text-[20px]` })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            onMouseDown: (e) => showCarousel(itemIndex),
            className: `relative h-[170px] xl:h-[160px]
                         rounded-md overflow-hidden -z-10
                    `,
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: imgSrc,
                alt: "",
                className: `object-cover w-full h-full -z-40
                        `
              }
            )
          }
        ),
        item.image_title.length > 0 && /* @__PURE__ */ jsx("div", { className: `text-[13px] mt-2 mb-1.5 leading-[1.2em] mx-[2px]`, children: item.image_title }),
        /* @__PURE__ */ jsx(
          GalleryItemMenu,
          {
            item,
            menu,
            userGuid,
            businessGuid
          }
        )
      ]
    }
  ) });
};
const Slider = ({ slides, selectedSlide, handleClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useRef(0);
  useRef(0);
  const prev = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === 0 ? slides.length - 1 : currentSlide2 - 1;
    });
  };
  const next = () => {
    setCurrentSlide((currentSlide2) => {
      return currentSlide2 === slides.length - 1 ? 0 : currentSlide2 + 1;
    });
  };
  useEffect(() => {
    if (selectedSlide !== null) {
      setCurrentSlide(selectedSlide - 1);
    }
  }, [selectedSlide]);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `grid grid-cols-12 gap-0 `, children: [
    /* @__PURE__ */ jsxs("div", { className: `col-span-12 md:col-span-9 w-full h-full relative bg-black flex`, children: [
      /* @__PURE__ */ jsx("div", { className: ` w-auto h-screen flex overflow-hidden`, children: slides.map((slide, index2) => {
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: slide.image_url,
            alt: "",
            style: { transform: `translateX(-${currentSlide * 100}%)` },
            className: `object-scale-down w-full h-full 
                                            block flex-shrink-0 flex-grow-0 transition-transform
                                            ease-in-out duration-1000`
          },
          index2
        );
      }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: prev, className: `block absolute top-0 bottom-0 
                p-[1rem] cursor-pointer left-0 group h-full 
                transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronLeft, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx("button", { onMouseDown: next, className: `block absolute top-0 bottom-0 
                    p-[1rem] cursor-pointer right-0 group 
                     transition duration-1000 ease-in-out`, children: /* @__PURE__ */ jsx("div", { className: `w-[50px] h-[50px] bg-white/60 rounded-full flex place-content-center place-items-center group-hover:bg-white/30
                        transition duration-500 ease-in-out`, children: /* @__PURE__ */ jsx(BiChevronRight, { className: " stroke-white fill-black w-[2rem] h-[2rem]" }) }) }),
      /* @__PURE__ */ jsx(
        "div",
        {
          onMouseDown: () => handleClose(),
          className: `w-[50px] h-[50px] z-[300] bg-white
                    flex place-content-center place-items-center
                    rounded-full absolute left-2 top-2 cursor-pointer
                    hover:bg-white/40 transition duration-1000 ease-in-out`,
          children: /* @__PURE__ */ jsx(IoClose, { className: `text-[30px]` })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `hidden md:block md:col-span-3 px-5`, children: [
      /* @__PURE__ */ jsx("h1", { className: " text-[22px] my-4 font-sans font-extrabold tracking-tight leading-[24px]", children: "Photos for Jason Won, DPT - Flex With Doctor Jay" }),
      /* @__PURE__ */ jsxs("div", { className: " my-4 ", children: [
        currentSlide + 1,
        " / ",
        slides.length
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx("div", { className: " my-4", children: slides[currentSlide].image_title })
    ] })
  ] }) });
};
const Carousel = ({
  overlay,
  setOverlay,
  selectedSlide,
  handleClose,
  gallery
}) => {
  return /* @__PURE__ */ jsx("div", { children: overlay && /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex w-screen h-screen bg-white z-[1000] 
                fixed top-0 left-0 right-0 bottom-0 `,
      children: gallery && selectedSlide && /* @__PURE__ */ jsx(
        Slider,
        {
          slides: gallery,
          selectedSlide,
          handleClose
        }
      )
    }
  ) });
};
const Gallery = ({ gallery, userGuid, businessGuid }) => {
  const [overlay, setOverlay] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const slider = useSliderContext();
  const handleClose = () => {
    setOverlay(false);
  };
  const showCarousel = (index2) => {
    slider.setDialog(true);
    slider.setSelectedSlide(index2 + 1);
    slider.setGallery(gallery);
  };
  return /* @__PURE__ */ jsxs("div", { className: ``, children: [
    /* @__PURE__ */ jsx("div", { className: ` border-[1px] p-3 rounded-[5px] 
                grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                lg:grid-cols-4 xl:grid-cols-5 gap-2 z-0`, children: gallery.map((item, index2) => {
      return /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
        GalleryItem,
        {
          showCarousel,
          item,
          itemIndex: index2,
          userGuid,
          businessGuid
        }
      ) }, index2);
    }) }),
    /* @__PURE__ */ jsx(
      Carousel,
      {
        overlay,
        setOverlay,
        selectedSlide: selectedSlide + 1,
        handleClose,
        gallery
      }
    )
  ] });
};
const AddPhoto = ({ userGuid, businessGuid }) => {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [dialog, setDialog] = useState(false);
  const addPhoto = useAddPhotoDialogContext();
  const handleFileChange = (event) => {
    var _a;
    try {
      const file = (_a = event.target.files) == null ? void 0 : _a[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImgSrc(imageUrl);
        setSelectedFile(file);
        setIsImageSelected(true);
        addPhoto.setDialog(true);
        addPhoto.setImgSrc(imageUrl);
        addPhoto.setSelectedFile(file);
        addPhoto.setIsImageSelected(true);
        addPhoto.setUserGuid(userGuid);
        addPhoto.setBusinessGuid(businessGuid);
      }
    } finally {
      event.target.value = "";
    }
  };
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: `mb-2`, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onMouseDown: handleImageClick,
        className: ` bg-blue-800 rounded-md px-3 py-1
                text-white hover:bg-blue-700 transition
                duration-500 ease-in-out hover:shadow-md
                 shadow-gray-900 hover:shadow-black/50`,
        children: "Add Photo"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "file",
        accept: "image/*",
        ref: fileInputRef,
        className: " hidden",
        onChange: handleFileChange
      }
    )
  ] });
};
const loader$C = async ({ request, params }) => {
  const businessGuid = params.business_guid || null;
  const userGuid = params.user_guid || null;
  const gallery = await getGallery(businessGuid, userGuid);
  return {
    businessGuid,
    userGuid,
    gallery
  };
};
const index$6 = () => {
  const loaderData = useLoaderData$1();
  const businessGuid = loaderData.businessGuid;
  const userGuid = loaderData.userGuid;
  const gallery = loaderData.gallery;
  return /* @__PURE__ */ jsxs(ProfileLayout, { title: "Photo Gallery", children: [
    /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    /* @__PURE__ */ jsx(AddPhoto, { userGuid, businessGuid }),
    gallery.length > 0 ? /* @__PURE__ */ jsx("div", { className: "z-0", children: /* @__PURE__ */ jsx(
      Gallery,
      {
        gallery,
        userGuid,
        businessGuid
      }
    ) }) : /* @__PURE__ */ jsx("div", { className: " mt-2 border-[1px] rounded-lg p-3 mb-6", children: "Gallery is empty" })
  ] });
};
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$6,
  loader: loader$C
}, Symbol.toStringTag, { value: "Module" }));
const FacilityFeatures = ({
  businessGuid,
  userGuid,
  facilityFeatures,
  selectedFacilityFeatures
}) => {
  const [working, setWorking] = useState(false);
  const notification = useNotification();
  const [features, setFeatures] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState(null);
  const [mergedFeatures, setMergedFeatures] = useState(null);
  useEffect(() => {
    if (facilityFeatures && selectedFacilityFeatures) {
      setFeatures(facilityFeatures);
      setSelectedFeatures(selectedFacilityFeatures);
    }
  }, [facilityFeatures, selectedFacilityFeatures]);
  useEffect(() => {
    if (features && selectedFeatures) {
      const mergedFeatures2 = features.map((feature) => {
        const selected = selectedFeatures.find(
          (selected2) => selected2.feature_id === feature.feature_id
        );
        return {
          ...feature,
          active: selected ? true : false,
          user_description: selected ? selected.user_description : void 0
        };
      });
      setMergedFeatures(mergedFeatures2);
    }
  }, [features, selectedFeatures]);
  const handleToggle = (id) => {
    setMergedFeatures(
      (prev) => prev.map(
        (feature) => feature.feature_id === id ? {
          ...feature,
          active: !feature.active,
          user_description: feature.user_description ? feature.user_description : ""
        } : feature
      )
    );
  };
  const handleDescriptionChange = (id, value) => {
    setMergedFeatures(
      (prev) => prev.map(
        (feature) => feature.feature_id === id ? { ...feature, user_description: value } : feature
      )
    );
  };
  const handleSave = async () => {
    const BASE_URL = "https://gursse.com";
    const endpoint = `/api/listings/selected_facility_features`;
    const url = BASE_URL + endpoint;
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    try {
      const selected = mergedFeatures.filter((f) => f.active).map((f) => {
        return {
          feature_id: f.feature_id,
          user_description: f.user_description
        };
      });
      let data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        selected
      };
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (response.ok) {
        notification.alertReload("", "Saved successfully!");
      } else {
        notification.alert("", "Failed to save.");
      }
    } catch (error) {
      notification.alert("", "Something happened!");
    } finally {
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold mb-3", children: "Select Facility Features" }),
    facilityFeatures.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: mergedFeatures == null ? void 0 : mergedFeatures.map((feature) => /* @__PURE__ */ jsxs(
        "label",
        {
          className: "flex items-center space-x-3 p-3 border rounded cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  onChange: () => handleToggle(feature.feature_id),
                  type: "checkbox",
                  checked: feature.active,
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-5 h-5 border-2 rounded ${feature.active ? "bg-green-500" : "bg-white"}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: " w-full", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium ", children: feature.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs ", children: feature.description }),
              /* @__PURE__ */ jsx("div", { className: " w-full h-[100px] mt-1 rounded overflow-hidden", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  onChange: (e) => handleDescriptionChange(feature.feature_id, e.target.value),
                  className: `w-full h-full bg-gray-100
                                            border p-3 text-sm`,
                  children: feature.user_description
                }
              ) })
            ] })
          ]
        },
        feature.feature_id
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleSave,
          className: "mt-5 px-4 py-2 bg-blue-600 text-white rounded",
          children: "Save Selected Features"
        }
      )
    ] })
  ] });
};
const loader$B = async ({ request, params }) => {
  const businessGuid = params.business_guid || null;
  const userGuid = params.user_guid || null;
  const facilityFeatures = await getSysFacilityFeatures();
  const selectedFacilityFeatures = await getSelectedFacilityFeatures(userGuid, businessGuid);
  const data = {
    businessGuid,
    userGuid,
    facilityFeatures,
    selectedFacilityFeatures
  };
  console.log(data);
  return data;
};
const index$5 = () => {
  const loaderData = useLoaderData$1();
  const businessGuid = loaderData.businessGuid;
  const userGuid = loaderData.userGuid;
  const facilityFeatures = loaderData.facilityFeatures;
  const selectedFacilityFeatures = loaderData.selectedFacilityFeatures;
  return /* @__PURE__ */ jsxs(ProfileLayout, { title: "Facilities", children: [
    /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    /* @__PURE__ */ jsx(
      FacilityFeatures,
      {
        userGuid,
        businessGuid,
        facilityFeatures,
        selectedFacilityFeatures
      }
    )
  ] });
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5,
  loader: loader$B
}, Symbol.toStringTag, { value: "Module" }));
const Activate = ({
  userGuid,
  businessGuid
}) => {
  const [isActive, setIsActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const notification = useNotification();
  const [working, setWorking] = useState(false);
  useEffect(() => {
    try {
      getBusiness(userGuid, businessGuid).then((business) => {
        setIsActive(business[0].active_status);
        setLoading(false);
      });
    } catch (error) {
      alert("Could not fetch business");
    }
  }, []);
  const toggleBusiness = async () => {
    setWorking(true);
    notification.notify();
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const newStatus = !isActive;
    try {
      const BASE_URL = "https://gursse.com";
      const endpoint = `/api/listings/activate/${userGuid}/${businessGuid}`;
      const url = BASE_URL + endpoint;
      const data = {
        user_guid: userGuid,
        business_guid: businessGuid,
        active: newStatus
      };
      const res = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      notification.notify("Completed");
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    } catch (error) {
    } finally {
      notification.cancel();
      setIsActive(newStatus);
    }
  };
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  return /* @__PURE__ */ jsxs("div", { className: `p-6 border rounded shadow max-w-lg
        mx-auto mt-12`, children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl mb-4", children: "Business Activation" }),
    /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2 hover:cursor-pointer", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: isActive ?? false,
          onChange: toggleBusiness,
          className: "w-5 h-5"
        }
      ),
      /* @__PURE__ */ jsx("span", { children: isActive ? "Active" : "Inactive" })
    ] })
  ] });
};
const loader$A = async ({ request, params }) => {
  const businessGuid = params.business_guid || null;
  const userGuid = params.user_guid || null;
  const data = {
    businessGuid,
    userGuid
  };
  console.log(data);
  return data;
};
const index$4 = () => {
  const loaderData = useLoaderData$1();
  const businessGuid = loaderData.businessGuid;
  const userGuid = loaderData.userGuid;
  return /* @__PURE__ */ jsxs(ProfileLayout, { title: "Activate/Deactivate", children: [
    /* @__PURE__ */ jsx(BusinessMenu, { guid: businessGuid, userGuid }),
    /* @__PURE__ */ jsx(
      Activate,
      {
        userGuid,
        businessGuid
      }
    )
  ] });
};
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$4,
  loader: loader$A
}, Symbol.toStringTag, { value: "Module" }));
const ProfileSchema = z.object({
  first_name: z.string().min(1, { message: "Enter a first name" }),
  lastname: z.any(),
  country_code: z.any(),
  state_code: z.any(),
  city_id: z.any(),
  phone: z.any(),
  address_one: z.any(),
  address_two: z.any(),
  country: z.any(),
  xsocial: z.any(),
  linksocial: z.any(),
  fbsocial: z.any(),
  zipcode: z.any()
});
const ImgComponent = ({ user, userProfileImageData }) => {
  const IMG_BASE_URL2 = "https://oxbyt.com";
  const notification = useNotification();
  let imgconst = "";
  if (userProfileImageData.image_url) {
    imgconst = IMG_BASE_URL2 + userProfileImageData.image_url;
  } else {
    imgconst = "https://trendyblinds.ca/wp-content/uploads/2023/09/3.-3D-WALLPAPER-SKU0015.jpg";
  }
  const [imgSrc, setImgSrc] = useState(imgconst);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isImgSelected, setIsImageSelected] = useState(false);
  const [working, setWorking] = useState(false);
  const handleImageClick = () => {
    var _a;
    (_a = fileInputRef.current) == null ? void 0 : _a.click();
  };
  const handleFileChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgSrc(imageUrl);
      setSelectedFile(file);
      setIsImageSelected(true);
    }
  };
  const handleUpload = async () => {
    setWorking(true);
    notification.notify("Working...");
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    if (isImgSelected) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("guid", user.user_guid);
      const IMG_BASE_URL22 = "https://oxbyt.com";
      const endpoint = "/user_profile_pic_upload";
      const url = IMG_BASE_URL22 + endpoint;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: formData
        });
        if (!response.ok) {
          let error = response.json().then((data) => {
            notification.alertCancel("", data.message);
          });
        } else {
          notification.alertReload("", "Image uploaded successfully!");
        }
      } catch (error) {
        return void 0;
      } finally {
        setWorking(false);
      }
    } else {
      notification.alertCancel("", "Please select an image to continue.");
      setWorking(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "relative bg-blue-100 w-[150px] h-[150px] z-40 rounded-full overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imgSrc,
          alt: "Click to upload",
          className: " object-cover w-full h-full z-0 absolute"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          accept: "image/*",
          ref: fileInputRef,
          className: " hidden",
          onChange: handleFileChange
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex place-content-center place-items-center
                                 bg-black/10 w-full h-full absolute z-0 top-0 object-cover
                                 text-white/80 `,
          onMouseDown: handleImageClick,
          children: /* @__PURE__ */ jsx("div", { className: `w-[50%] h-[50%] flex flex-col
                                    place-content-center place-items-center
                                    hover:cursor-pointer hover:bg-white/50
                                    rounded-full transition duration-300 ease-in-out`, children: /* @__PURE__ */ jsx(MdEditSquare, { className: " text-[30px]" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: ` flex flex-col place-items-center 
                place-content-center mt-2 `, children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `${working ? "bg-gray-200 cursor-default" : "bg-blue-100"}  w-full py-[6px] rounded-[8px] border-[1px] border-gray-200
                        shadow-sm hover:shadow-lg transition duration-500 ease-in-out`,
        onMouseDown: handleUpload,
        disabled: working,
        children: working ? "Uploading..." : "Upload"
      }
    ) })
  ] });
};
const ProfileForm = ({ loaderData, user, userProfileData, userProfileImageData }) => {
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const countries = loaderData.countries;
  let [states, setStates] = useState(loaderData.states);
  let [cities, setCities] = useState(loaderData.cities);
  loaderData.categories.data;
  const [countryCode, setCountryCode] = useState(loaderData.userProfileData.country_code);
  const [stateCode, setStateCode] = useState(loaderData.userProfileData.state_code);
  const [newCountryCode, setNewCountryCode] = useState("");
  const [newStateCode, setNewStateCode] = useState("");
  const resetStates = async (countryCode2) => {
    setCountryCode(countryCode2);
    setNewCountryCode(countryCode2);
    const states2 = await getStates(countryCode2);
    setStates(states2);
    resetCities("");
  };
  const resetCities = async (stateCode2) => {
    setStateCode(stateCode2);
    setNewStateCode(stateCode2);
    const cities2 = await getCities(countryCode, stateCode2);
    setCities(cities2);
  };
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleUpdateUser = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/users/" + user.guid;
    const url = BASE_URL + endpoint;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        var respObj = await response.json();
        throw new Error(`Error Code: ${response.status} - ${respObj.error}`);
      } else {
        alert("Update is Successfully!");
      }
    } catch (error) {
      alert(error.message);
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: userProfileData,
    resolver: zodResolver(ProfileSchema)
  });
  useEffect(() => {
    if (newCountryCode) {
      setValue("state_code", "");
      setValue("city_id", "");
    }
  }, [newCountryCode]);
  useEffect(() => {
    if (newStateCode) {
      setValue("city_id", "");
    }
  }, [newStateCode]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "form__wrapper__class", children: /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class flex flex-col place-items-center md:place-items-start", children: [
      /* @__PURE__ */ jsx("div", { className: "input__heading__class", children: "Add/Change Photo" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
        ImgComponent,
        {
          user: userProfileData,
          userProfileImageData: loaderData.userProfileImageData
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleUpdateUser), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class -mt-0", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "First Name",
          controlName: "first_name",
          controlPlaceholder: "Enter first name",
          register,
          changeHandler,
          error: errors.first_name
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Last Name",
          controlName: "lastname",
          controlPlaceholder: "Enter last name",
          register,
          changeHandler,
          error: errors.lastname
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "Country",
          controlName: "country_code",
          controlPlaceholder: "Select Country",
          selectJson: countries,
          register,
          changeHandler,
          error: errors.country_code,
          setCode: resetStates
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "State",
          controlName: "state_code",
          controlPlaceholder: "Select State",
          selectJson: states,
          register,
          changeHandler,
          setCode: resetCities
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          controlTitle: "City",
          controlName: "city_id",
          controlPlaceholder: "Select City",
          selectJson: cities,
          register,
          changeHandler
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Zipcode",
          controlName: "zipcode",
          controlPlaceholder: "Enter zip code",
          register,
          changeHandler
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Phone",
          controlName: "phone",
          controlPlaceholder: "Enter phone number",
          register,
          changeHandler
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address Line 1",
          controlName: "address_one",
          controlPlaceholder: "Enter address",
          register,
          changeHandler
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          controlTitle: "Address Line 2",
          controlName: "address_two",
          controlPlaceholder: "Enter address",
          register,
          changeHandler
        }
      ),
      /* @__PURE__ */ jsx(Button, { working })
    ] }) })
  ] });
};
const loader$z = async ({ request, params }) => {
  const guid = params.guid;
  const userProfileData = await getUserProfile(guid || "");
  const countries = await getCountries();
  const userProfileDataObject = userProfileData;
  const states = await getStates(userProfileDataObject.country_code || "");
  const cities = await getCities(userProfileDataObject.country_code || "", userProfileDataObject.state_code || "");
  const categories = await getCategories();
  const userProfileImageData = await getUserProfileImageData(guid || "");
  const data = {
    guid,
    userProfileData,
    countries,
    states,
    cities,
    categories,
    userProfileImageData
  };
  return DoResponse(data, 200);
};
const index$3 = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  const [userProfileData, setUserProfileData] = useState(void 0);
  useEffect(() => {
    if (user == null ? void 0 : user.guid) {
      getUserProfile(user == null ? void 0 : user.guid).then((data) => {
        setUserProfileData(data);
      });
    }
  }, [user == null ? void 0 : user.guid]);
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Profile", children: loaderData && user && userProfileData && /* @__PURE__ */ jsx(
    ProfileForm,
    {
      loaderData,
      user,
      userProfileData
    }
  ) });
};
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$3,
  loader: loader$z
}, Symbol.toStringTag, { value: "Module" }));
const EmailSchema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const EmailForm = ({ loaderData, user }) => {
  var _a, _b;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleEmailChangeRequest = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/users/change_email_request";
    const url = BASE_URL + endpoint;
    data["guid"] = loaderData.userProfileData.user_guid;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          alert(data2.error);
        });
      } else {
        alert("Email Change Request Successfully Sent!");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(EmailSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleEmailChangeRequest), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class", children: [
    /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
      /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Current email" }),
      /* @__PURE__ */ jsxs("div", { className: " pt-3 pb-4 text-[15px] leading-5", children: [
        "[",
        (_a = loaderData.userProfileData) == null ? void 0 : _a.email,
        "] will be used for account-related notifications and can be used for password resets."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-[1px] rounded-[8px] px-3 py-3 bg-gray-100", children: [
        (_b = loaderData.userProfileData) == null ? void 0 : _b.email,
        "  "
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Update Email",
        controlPlaceholder: "Enter new email address",
        controlName: "email",
        register,
        changeHandler,
        error: errors.email
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) });
};
const loader$y = async ({ request, params }) => {
  const guid = params.guid;
  const userProfileData = await getUserProfile(guid || "");
  const data = {
    guid,
    userProfileData
  };
  return DoResponse(data, 200);
};
const index$2 = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Update Email", children: loaderData && /* @__PURE__ */ jsx(EmailForm, { loaderData, user }) });
};
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2,
  loader: loader$y
}, Symbol.toStringTag, { value: "Module" }));
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()£@$%^&*-]).{8,}$/
);
const ChangePasswordSchema = z.object({
  oldpassword: z.string().min(1, { message: "Please enter old password." }).min(8, { message: "Password must be up to 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  }),
  newpassword: z.string().min(1, { message: "Please enter new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  }),
  newpassword2: z.string().min(1, { message: "Please retype new password." }).min(8, { message: "Password must be at least 8 characters." }).regex(passwordValidation, {
    message: "Please enter a valid password"
  })
}).superRefine((data, ctx) => {
  if (data.oldpassword === data.newpassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["newpassword"],
      message: "New password cannot be the same as old password"
    });
  }
  if (data.newpassword !== data.newpassword2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["newpd2"],
      message: "Your new password don't match"
    });
  }
});
const ChangePasswordForm = ({ loaderData, user }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleEmailChangeRequest = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/users/change_password/" + loaderData.userProfileData.user_guid;
    const url = BASE_URL + endpoint;
    data["password"] = data.newpassword;
    delete data["oldpassword"];
    delete data["newpassword"];
    delete data["newpassword2"];
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          alert(data2.error);
        });
      } else {
        alert("Password Successfully Changed! Use new password on next login");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.listing,
    resolver: zodResolver(ChangePasswordSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleEmailChangeRequest), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class", children: [
    /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
      /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Change Password" }),
      /* @__PURE__ */ jsxs("div", { className: " pt-3 text-[15px] leading-5", children: [
        /* @__PURE__ */ jsx("b", { children: (_a = loaderData.userProfileData) == null ? void 0 : _a.email }),
        " is your current email. It will be used be used for password resets or changes."
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Current Password",
        controlPlaceholder: "Enter current password",
        controlType: "password",
        controlName: "oldpassword",
        register,
        changeHandler,
        error: errors.oldpassword
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "New Password",
        controlType: "password",
        controlPlaceholder: "Enter new password",
        controlName: "newpassword",
        register,
        changeHandler,
        error: errors.newpassword
      }
    ),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Retype New Password",
        controlPlaceholder: "Retype new password",
        controlName: "newpassword2",
        controlType: "password",
        register,
        changeHandler,
        error: errors.newpassword2
      }
    ),
    /* @__PURE__ */ jsx(Button, { working })
  ] }) });
};
const loader$x = async ({ request, params }) => {
  const guid = params.guid;
  const userProfileData = await getUserProfile(guid || "");
  const data = {
    guid,
    userProfileData
  };
  return DoResponse(data, 200);
};
const Profile = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Change Password", children: loaderData && /* @__PURE__ */ jsx(ChangePasswordForm, { loaderData, user }) });
};
const route24 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Profile,
  loader: loader$x
}, Symbol.toStringTag, { value: "Module" }));
const ResetPasswordSchema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const ResetPasswordForm = ({ loaderData, user }) => {
  var _a;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleSendResetEmail = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/users/reset_password_request";
    const url = BASE_URL + endpoint;
    data["owner"] = loaderData.userProfileData.user_guid;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          alert(data2.error);
        });
      } else {
        alert("Request Initiated. Please check your email to continue.");
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.userProfileData,
    resolver: zodResolver(ResetPasswordSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleSendResetEmail), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class", children: [
    /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
      /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: "Reset Password" }),
      /* @__PURE__ */ jsxs("div", { className: " pt-3 text-[15px] leading-5", children: [
        /* @__PURE__ */ jsx("b", { children: (_a = loaderData.userProfileData) == null ? void 0 : _a.email }),
        " is your current email. It will be used be used for password resets or changes."
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Your Email Address",
        controlPlaceholder: "Retype new password",
        controlName: "email",
        controlType: "text",
        disabled: true,
        register,
        changeHandler,
        error: errors.newpassword2
      }
    ),
    /* @__PURE__ */ jsx(Button, { working, value: "Send Reset Email" })
  ] }) });
};
const loader$w = async ({ request, params }) => {
  const guid = params.guid;
  const userProfileData = await getUserProfile(guid || "");
  const data = {
    guid,
    userProfileData
  };
  return DoResponse(data, 200);
};
const index$1 = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Reset Password", children: loaderData && /* @__PURE__ */ jsx(ResetPasswordForm, { loaderData, user }) });
};
const route25 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  loader: loader$w
}, Symbol.toStringTag, { value: "Module" }));
const DeactivateUserSchema = z.object({
  email: z.string({ message: "Please enter an email." }).min(1, { message: "Email must not be empty" }).email({ message: "Please enter a valid email" })
});
const DeactivateUserForm = ({ loaderData, user }) => {
  var _a, _b, _c;
  const [formdata, setFormdata] = useState(null);
  const [working, setWorking] = useState(false);
  const changeHandler = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormdata((previousValue) => {
      return {
        ...previousValue,
        [name]: value
      };
    });
  };
  const handleDeactivateUser = async (data) => {
    setWorking(true);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    let guid = loaderData.userProfileData.user_guid;
    const BASE_URL = "https://gursse.com";
    const endpoint = "/api/users/activate_deactivate/" + guid;
    const url = BASE_URL + endpoint;
    data["active"] = loaderData.userProfileData.active ? false : true;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        let error = response.json().then((data2) => {
          alert(data2.message);
        });
      } else {
        alert(`You are now ${data["active"] ? "activated" : "deactivated"}`);
        window.location.reload();
      }
    } catch (error) {
      return void 0;
    } finally {
      setWorking(false);
    }
  };
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: loaderData.userProfileData,
    resolver: zodResolver(DeactivateUserSchema)
  });
  return /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit(handleDeactivateUser), children: /* @__PURE__ */ jsxs("div", { className: "form__wrapper__class", children: [
    /* @__PURE__ */ jsxs("div", { className: "input__wrapper_class", children: [
      /* @__PURE__ */ jsx("div", { className: " text-xl text-gray-700 font-semibold border-b pb-1", children: ((_a = loaderData.userProfileData) == null ? void 0 : _a.active) ? "Deactivate User" : "Activate User" }),
      /* @__PURE__ */ jsxs("div", { className: " pt-3 text-[15px] leading-5", children: [
        /* @__PURE__ */ jsx("b", { children: (_b = loaderData.userProfileData) == null ? void 0 : _b.email }),
        " is your current email. It will be used for password resets or changes."
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Input,
      {
        controlTitle: "Your Email Address",
        controlPlaceholder: "Retype new password",
        controlName: "email",
        controlType: "text",
        disabled: true,
        register,
        changeHandler,
        error: errors.newpassword2
      }
    ),
    /* @__PURE__ */ jsx(Button, { working, value: `${((_c = loaderData.userProfileData) == null ? void 0 : _c.active) ? "Deactivate User" : "Activate User"}` })
  ] }) });
};
const loader$v = async ({ request, params }) => {
  const guid = params.guid;
  const userProfileData = await getUserProfile(guid || "");
  const data = {
    guid,
    userProfileData
  };
  return DoResponse(data, 200);
};
const index = () => {
  const loaderData = useLoaderData();
  const { user } = useAuth();
  return /* @__PURE__ */ jsx(ProfileLayout, { title: "Activate/Deactivate User", children: loaderData && /* @__PURE__ */ jsx(DeactivateUserForm, { loaderData, user }) });
};
const route26 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  loader: loader$v
}, Symbol.toStringTag, { value: "Module" }));
let cachedPool = global.mysqlPool || null;
const DATABASE_HOST = "localhost";
const DATABASE_PORT = "3306";
const DATABASE_NAME = "comvoinh_dbdirtest";
const DATABASE_PASS = "Querty123$$$$";
const DATABASE_USER = "comvoinh_dbdirtest";
if (!cachedPool) {
  cachedPool = global.mysqlPool = mysql.createPool({
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT) || 3306,
    user: DATABASE_USER,
    password: DATABASE_PASS,
    database: DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}
async function getConnection() {
  console.log(DATABASE_HOST);
  console.log("hello");
  return cachedPool.getConnection();
}
async function query(sql, values = []) {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(sql, values);
    connection.commit();
    return results;
  } finally {
    connection.release();
  }
}
async function loader$u() {
  let users = null;
  try {
    users = await query(`SELECT * FROM tbl_user ORDER BY date_created DESC`);
    return DoResponse(users, 200);
  } catch (error) {
    let errors = { "error": error.message };
    return DoResponse(errors, 500);
  }
  return new Response(JSON.stringify({ users }), {
    headers: { "Content-Type": "application/json" }
  });
}
async function action$g({ request }) {
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
      }
      const body = await request.json();
      if (!body.email || !body.first_name || !body.password) {
        return DoResponse({ error: "Missing email or firstname" }, 400);
      }
      const userGuid = crypto.randomUUID();
      const hashedPassword = HashPwd(body.password);
      const userHash = GenerateRandomHash();
      const verifyCode = generate7DigitNumber();
      {
      }
      const rows = await query(`SELECT * FROM tbl_user WHERE email = ?`, [body.email]);
      if (rows.length > 0) {
        return DoResponse(
          {
            exists: true,
            message: "Email is not available. Check your email if you tried to signed up earlier."
          },
          409
        );
      }
      const result = await query(
        `INSERT INTO tbl_user 
                (email, password, first_name, user_guid, user_hash, verify_code)
                VALUES (?, ?, ?, ?, ?, ?)`,
        [
          body.email,
          hashedPassword,
          body.first_name,
          userGuid,
          userHash,
          verifyCode
        ]
      );
      const data = {
        success: true,
        message: "User created successfully",
        userId: result.insertId,
        user_guid: userGuid,
        user_hash: userHash,
        first_name: body.first_name,
        email: body.email
      };
      return DoResponse({ requestMethod: data }, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route27 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$g,
  loader: loader$u
}, Symbol.toStringTag, { value: "Module" }));
const loader$t = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    rows.map((user) => {
      return {
        email: user.email,
        first_name: user.first_name,
        hash: user.user_hash,
        guid: user.user_guid,
        active: user.active,
        deleted: user.deleted
      };
    });
    delete rows[0].password;
    return DoResponse(rows[0], 200);
  }
};
const action$f = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({ error: "User does not exist" }, 400);
      }
      {
      }
      let first_name = body.first_name === void 0 ? user.first_name : body.first_name;
      let lastname = body.lastname === void 0 ? user.lastname : body.lastname;
      let country_code = body.country_code === void 0 ? user.country_code : body.country_code;
      let state_code = body.state_code === void 0 ? user.state_code : body.state_code;
      let city_id = body.city_id === void 0 ? user.city_id : body.city_id;
      let zipcode = body.zipcode === void 0 ? user.zipcode : body.zipcode;
      let phone = body.phone === void 0 ? user.phone : body.phone;
      let address_one = body.address_one === void 0 ? user.address_one : body.address_one;
      let address_two = body.address_two === void 0 ? user.address_two : body.address_two;
      const result = await query(
        `UPDATE tbl_user SET
                first_name = ?,
                lastname = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                zipcode = ?,
                phone = ?,
                address_one = ?,
                address_two = ?
                WHERE user_guid = ?`,
        [
          first_name,
          lastname,
          country_code,
          state_code,
          city_id,
          zipcode,
          phone,
          address_one,
          address_two,
          guid
        ]
      );
      return DoResponse({
        success: true,
        message: "User updated successfully",
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({
          success: false,
          error: "User does not exist"
        }, 404);
      }
      const result = await query(
        `DELETE FROM tbl_user
                WHERE user_guid = ?`,
        [guid]
      );
      const data = {
        message: `User ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route28 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$f,
  loader: loader$t
}, Symbol.toStringTag, { value: "Module" }));
const VerifiedStatus = {
  OK: true,
  PENDING: false
};
const JWT_SECRET$1 = "2454522643636363463643565346346";
const action$e = async ({ request }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  try {
    const body = await request.json();
    if (!body.email || !body.password) {
      return DoResponse({ error: "Missing email or password" }, 400);
    }
    const { email, password } = body;
    const hashedPassword = HashPwd(password);
    const rows = await query(`SELECT * FROM tbl_user 
            WHERE
            email = ?
            AND
            password = ?`, [email, hashedPassword]);
    const user = rows[0];
    if (rows.length <= 0) {
      return DoResponse({
        success: false,
        message: "Please check your email and password and try again!"
      }, 405);
    }
    if (Boolean(rows[0].is_verified) === VerifiedStatus.PENDING) {
      const verifyCode = generate7DigitNumber();
      const result = await query(
        `UPDATE tbl_user 
                SET
                verify_code = ?
                WHERE
                user_hash = ?`,
        [
          verifyCode,
          rows[0].user_hash
        ]
      );
      return DoResponse({ message: "Please check your email to complete signup." }, 500);
    }
    const JWT_INFO = {
      guid: user.user_guid,
      email: user.email,
      first_name: user.first_name,
      last_name: user.lastname
    };
    const accessToken = jwt.sign(JWT_INFO, JWT_SECRET$1, { expiresIn: "7d" });
    const refreshToken = jwt.sign(JWT_INFO, JWT_SECRET$1, { expiresIn: "7d" });
    const tokens = {
      accessToken,
      refreshToken
    };
    return DoResponse(tokens, 200);
  } catch (error) {
    return DoResponse({ message: error.message }, 500);
  }
};
const route29 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$e
}, Symbol.toStringTag, { value: "Module" }));
const JWT_SECRET = "2454522643636363463643565346346";
async function action$d({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 405);
  }
  if (request.method === "POST") {
    try {
      const requestToken = await request.json();
      const token = requestToken.token;
      const user = jwt.verify(token, JWT_SECRET);
      return DoResponse(user, 200);
    } catch (error) {
      return DoResponse(null, 200);
    }
  }
  return DoResponse({ success: false, message: "method not allowed" }, 405);
}
const route30 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$s = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$c({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userGuid = params.guid;
      if (!body.password) {
        return DoResponse({ error: "Enter password!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      const password = body.password;
      const hashedPassword = HashPwd(password);
      {
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    password = ? 
                    WHERE
                    user_guid = ?`,
        [hashedPassword, userGuid]
      );
      const data = {
        success: true,
        message: "password change is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route31 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$c,
  loader: loader$s
}, Symbol.toStringTag, { value: "Module" }));
async function action$b({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email) {
        return DoResponse({ error: "Enter email!" }, 400);
      }
      {
      }
      let rows = await query(
        `SELECT * FROM tbl_user 
                WHERE 
                email = ?`,
        [body.email]
      );
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with email does not exist!"
          },
          409
        );
      }
      const user = rows[0];
      {
      }
      const title = "Password Request";
      const type = RequestType.PASSWORD_RESET;
      const owner = user.user_guid;
      const guid = crypto.randomUUID();
      const status = RequestStatus.OPEN;
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type]);
      if (rows.length > 0) {
        {
        }
        console.log(`UPDATE tbl_requests 
                    SET
                    title = '${title}',
                    type = '${type}',
                    guid = '${guid}',
                    status = '${status}'
                    WHERE
                    owner = '${owner}'
                    AND
                    type = '${type}'
                    AND
                    status = '${status}'`);
        const result = await query(
          `UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
          [title, type, guid, status, owner, type, status]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
          [title, type, owner, guid, status]
        );
      }
      const data = {
        success: true,
        message: "password reset initiated. check email to continue.",
        title,
        type,
        owner,
        guid,
        status
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 200);
}
const route32 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$r = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$a({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userGuid = params.guid;
      if (!body.password) {
        return DoResponse({ error: "Enter password!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      const password = body.password;
      const hashedPassword = HashPwd(password);
      {
      }
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE
                owner = ?
                AND
                status = ?
                AND
                type = ?`, [userGuid, RequestStatus.OPEN, RequestType.PASSWORD_RESET]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "Link has expired! Initiate another password request."
          },
          405
        );
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    password = ? 
                    WHERE
                    user_guid = ?`,
        [hashedPassword, userGuid]
      );
      {
      }
      result = await query(
        `UPDATE tbl_requests 
                    SET
                    status = ? 
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
        [
          RequestStatus.CLOSED,
          userGuid,
          RequestType.PASSWORD_RESET,
          RequestStatus.OPEN
        ]
      );
      const data = {
        success: true,
        message: "password reset is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      console.log(error.message + ">>>]");
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route33 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$a,
  loader: loader$r
}, Symbol.toStringTag, { value: "Module" }));
async function action$9({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.email) {
        return DoResponse({ error: "Enter email!" }, 400);
      }
      if (!body.guid) {
        return DoResponse({ error: "User / Owner Guid is required!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [body.guid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User does not exist!"
          },
          409
        );
      }
      const user = rows[0];
      {
      }
      const title = "Email Change Request";
      const type = RequestType.CHANGE_EMAIL;
      const owner = user.user_guid;
      const guid = crypto.randomUUID();
      const status = RequestStatus.OPEN;
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type]);
      if (rows.length > 0) {
        {
        }
        const result = await query(
          `UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
          [title, type, guid, status, owner, type, status]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
          [title, type, owner, guid, status]
        );
      }
      const data = {
        success: true,
        message: "email change request saved successfully",
        title,
        type,
        owner,
        guid,
        status
      };
      return DoResponse(data, 200);
    } catch (error) {
      console.log(error.message + ">>>]");
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route34 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$q = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
};
async function action$8({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const url = new URL(request.url);
      let userGuid = url.searchParams.get("guid");
      let email = url.searchParams.get("email");
      if (email === void 0) {
        return DoResponse({ error: "Enter new email!" }, 400);
      }
      {
      }
      let rows = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with id does not exist!"
          },
          404
        );
      }
      const user = rows[0];
      {
      }
      rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [userGuid, RequestStatus.OPEN, RequestType.CHANGE_EMAIL]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "Request has expired!"
          },
          404
        );
      }
      {
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    email = ? 
                    WHERE
                    user_guid = ?`,
        [email, userGuid]
      );
      {
      }
      result = await query(
        `UPDATE tbl_requests 
                    SET
                    status = ? 
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
        [RequestStatus.CLOSED, userGuid, RequestType.CHANGE_EMAIL, RequestStatus.OPEN]
      );
      const data = {
        success: true,
        message: "email change is successful"
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route35 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$8,
  loader: loader$q
}, Symbol.toStringTag, { value: "Module" }));
const loader$p = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const action$7 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({ error: "User does not exist" }, 400);
      }
      {
      }
      let active = body.active === void 0 ? user.active : body.active;
      const result = await query(
        `UPDATE tbl_user SET
                active = ? 
                WHERE user_guid = ?`,
        [
          active,
          guid
        ]
      );
      return DoResponse({
        success: true,
        message: `User ${active ? "activated" : "deactivated"} successfully`,
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawuser = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid]);
      const user = rawuser[0];
      if (rawuser.length <= 0) {
        return DoResponse({
          success: false,
          error: "User does not exist"
        }, 404);
      }
      const result = await query(
        `DELETE FROM tbl_user
                WHERE user_guid = ?`,
        [guid]
      );
      const data = {
        message: `User ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route36 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$7,
  loader: loader$p
}, Symbol.toStringTag, { value: "Module" }));
const loader$o = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const userHash = params.user_hash;
    const rows = await query(`SELECT * FROM tbl_user 
            WHERE
            user_hash = ?`, [userHash]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const users = rows.map((user) => {
      return {
        email: user.email,
        first_name: user.first_name,
        hash: user.user_hash,
        guid: user.user_guid,
        active: user.active,
        deleted: user.deleted
      };
    });
    delete rows[0].password;
    return DoResponse(users[0], 200);
  }
};
const route37 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$o
}, Symbol.toStringTag, { value: "Module" }));
async function action$6({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "PUT") {
    try {
      const body = await request.json();
      let userHash = params.user_hash;
      let code = body.code;
      {
      }
      let rows = await query(`SELECT * FROM tbl_user 
                WHERE
                user_hash = ?`, [userHash]);
      if (rows.length <= 0) {
        return DoResponse(
          {
            exists: false,
            message: "User with hash does not exist!"
          },
          500
        );
      }
      const user = rows[0];
      {
      }
      {
      }
      rows = await query(`SELECT * FROM tbl_user 
                WHERE
                user_hash = ?
                AND
                is_verified = ?
                `, [userHash, VerifiedStatus.OK]);
      if (rows.length > 0) {
        return DoResponse(
          {
            exists: false,
            message: "You have been verified! You can now signin with your email and password."
          },
          500
        );
      }
      let result = await query(
        `UPDATE tbl_user 
                    SET
                    is_verified = ? 
                    WHERE
                    user_hash = ?`,
        [VerifiedStatus.OK, userHash]
      );
      const data = {
        success: true,
        message: "Sign up is complete. You can now signin with your email and password! Redirecting..."
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ message: error.message }, 500);
    }
  }
  return DoResponse({ message: "method not allowed" }, 500);
}
const route38 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$n = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(`SELECT * FROM tbl_user_profile_image WHERE user_guid = ?`, [guid]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route39 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$n
}, Symbol.toStringTag, { value: "Module" }));
const loader$m = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const guid = params.guid;
    const rows = await query(
      `SELECT * FROM tbl_business_profile_image 
            WHERE
            business_guid = ?`,
      [guid]
    );
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    return DoResponse(rows[0], 200);
  }
};
const route40 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$m
}, Symbol.toStringTag, { value: "Module" }));
const loader$l = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const rawdata = await query(`SELECT * FROM tbl_dir ORDER BY date_created DESC`);
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$5({ request, params }) {
  if (request.method === "POST") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
      }
      const body = await request.json();
      const rows = await query(`SELECT * FROM tbl_dir 
                WHERE
                SOUNDEX(title) = SOUNDEX(?)
                AND
                owner = ?`, [body.title, body.owner]);
      let title = "";
      if (body.branch === false || body.branch === void 0) {
        {
        }
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({ exists: true, message: "A similar business or branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
            { status: 409 }
          );
        }
      } else {
        if (rows.length > 0) {
          return new Response(
            JSON.stringify({ exists: true, message: "A similar branch name exists. If this is a branch, add a comma and additional phrase to identify the branch e.g. Business Inc., New York!" }),
            { status: 409 }
          );
        }
      }
      if (!body.title) {
        return new Response(JSON.stringify({ error: "Missing Title" }), { status: 400 });
      }
      if (!body.category) {
        return new Response(JSON.stringify({ error: "Missing Category" }), { status: 400 });
      }
      if (!body.short_description) {
        return new Response(JSON.stringify({ error: "Missing Short Description" }), { status: 400 });
      }
      if (!body.phone) {
        return new Response(JSON.stringify({ error: "Missing Phone" }), { status: 400 });
      }
      if (!body.email_address) {
        return new Response(JSON.stringify({ error: "Missing Email Address" }), { status: 400 });
      }
      if (!body.address_one) {
        return new Response(JSON.stringify({ error: "Missing Address" }), { status: 400 });
      }
      if (!body.zipcode) {
        return new Response(JSON.stringify({ error: "Missing Zipcode" }), { status: 400 });
      }
      if (!body.owner) {
        return new Response(JSON.stringify({ error: "Missing Owner" }), { status: 400 });
      }
      if (!body.established) {
        return new Response(JSON.stringify({ error: "Missing Year Established" }), { status: 400 });
      }
      let branch = false;
      let branch_location = "";
      if (body.branch !== void 0) {
        branch = body.branch;
      }
      if (body.branch_location !== void 0) {
        branch_location = body.branch_location;
      }
      const gid = crypto.randomUUID();
      const listingHash = GenerateRandomHash();
      console.log(body);
      const result = await query(
        `INSERT INTO tbl_dir SET 
                title = ?, 
                branch = ?,
                branch_location = ?, 
                category = ?, 
                short_description = ?, 
                long_description = ?, 
                phone = ?, 
                email_address = ?, 
                address_one = ?, 
                address_two = ?,
                country_code = ?,
                state_code = ?, 
                city_id = ?,
                zipcode = ?, 
                gid = ?, 
                owner = ?,
                established = ?,
                listing_hash = ?`,
        [
          body.title || null,
          branch,
          branch_location,
          body.category || null,
          body.short_description || null,
          body.long_description || null,
          body.phone || null,
          body.email_address || null,
          body.address_one || null,
          body.address_two || null,
          body.country_code || null,
          body.state_code || null,
          body.city_id || null,
          body.zipcode || null,
          gid,
          body.owner || null,
          body.established || null,
          listingHash || null
        ]
      );
      const data = {
        message: "Listing created successfully",
        data: body,
        guid: gid,
        listing_hash: listingHash
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route41 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$5,
  loader: loader$l
}, Symbol.toStringTag, { value: "Module" }));
const loader$k = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const id = params.guid_or_username;
    const rows = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != ''
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.gid = ? OR d.username = ?)
            `, [id, id]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$4 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let guid = params.guid_or_username;
      {
      }
      const rawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const listing = rawlisting[0];
      if (rawlisting.length <= 0) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Listing does not exist"
          }),
          { status: 400 }
        );
      }
      {
      }
      let email_address = body.email_address === void 0 ? listing.email_address : body.email_address;
      let title = body.title === void 0 ? listing.title : body.title;
      let branch = body.branch === void 0 ? Boolean(listing.branch) : Boolean(body.branch);
      let branch_location = body.branch_location === void 0 ? listing.branch_location : body.branch_location;
      let category = body.category === void 0 ? listing.category : body.category;
      let short_description = body.short_description === void 0 ? listing.short_description : body.short_description;
      let long_description = body.long_description === void 0 ? listing.long_description : body.long_description;
      let phone = body.phone === void 0 ? listing.phone : body.phone;
      let address_one = body.address_one === void 0 ? listing.address_one : body.address_one;
      let address_two = body.address_two === void 0 ? listing.address_two : body.address_two;
      let img = body.img === void 0 ? listing.img : body.img;
      let owner = body.owner === void 0 ? listing.owner : body.owner;
      let username = body.username === void 0 ? listing.username : body.username;
      let zipcode = body.zipcode === void 0 ? listing.zipcode : body.zipcode;
      let products = body.products === void 0 ? listing.products : body.products;
      let services = body.services === void 0 ? listing.services : body.services;
      let business_phrases = body.business_phrases === void 0 ? listing.business_phrases : body.business_phrases;
      let established = body.established === void 0 ? listing.established : body.established;
      let xsocial = body.xsocial === void 0 ? listing.xsocial : body.xsocial;
      let fbsocial = body.fbsocial === void 0 ? listing.fbsocial : body.fbsocial;
      let linksocial = body.linksocial === void 0 ? listing.linksocial : body.linksocial;
      let country_code = body.country_code === void 0 ? listing.country_code : body.country_code;
      let state_code = body.state_code === void 0 ? listing.state_code : body.state_code;
      let city_id = body.city_id === void 0 ? listing.city_id : body.city_id;
      let website = body.website === void 0 ? listing.website : body.website;
      let sql = `UPDATE tbl_dir SET
                title = '${title}',
                branch = '${branch}',
                branch_location = '${branch_location}',
                category = '${category}',
                short_description = '${short_description}',
                phone = '${phone}',
                email_address = '${email_address}',
                address_one = '${address_one}',
                address_two = '${address_two}',
                owner = '${owner}',
                username = '${username}',
                img = '${img}',
                zipcode = '${zipcode}',
                products = '${products}',
                services = '${services}',
                business_phrases = '${business_phrases}',
                established = '${established}',
                xsocial = '${xsocial}',
                fbsocial = '${fbsocial}',
                linksocial = '${linksocial}',
                country_code = '${country_code}',
                state_code = '${state_code}',
                city_id = '${city_id}',
                website = '${website}'
                WHERE
                gid = '${guid}'`;
      const result = await query(
        `UPDATE tbl_dir SET
                title = ?,
                branch = ?,
                branch_location = ?,
                category = ?,
                short_description = ?,
                long_description = ?,
                phone = ?,
                email_address = ?,
                address_one = ?,
                address_two = ?,
                owner = ?,
                username = ?,
                img = ?,
                zipcode = ?,
                products = ?,
                services = ?,
                business_phrases = ?,
                established = ?,
                xsocial = ?,
                fbsocial = ?,
                linksocial = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                website = ?
                WHERE
                gid = ?`,
        [
          title,
          branch,
          branch_location,
          category,
          short_description,
          long_description,
          phone,
          email_address,
          address_one,
          address_two,
          owner,
          username,
          img,
          zipcode,
          products,
          services,
          business_phrases,
          established,
          xsocial,
          fbsocial,
          linksocial,
          country_code,
          state_code,
          city_id,
          website,
          guid
        ]
      );
      {
      }
      {
      }
      const updatedrawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const updatedlisting = updatedrawlisting[0];
      const data = {
        success: true,
        message: "Listing updated successfully",
        data: updatedlisting
      };
      return DoResponse(data, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  if (request.method === "DELETE") {
    try {
      {
      }
      let guid = params.guid;
      {
      }
      const rawlisting = await query(`SELECT * FROM tbl_dir WHERE gid = ?`, [guid]);
      const listing = rawlisting[0];
      if (rawlisting.length <= 0) {
        return new Response(
          JSON.stringify({ error: "Listing does not exist" }),
          { status: 400 }
        );
      }
      {
      }
      const result = await query(
        `DELETE FROM tbl_dir
                WHERE gid = ?`,
        [guid]
      );
      const data = {
        success: true,
        message: `Listing ${guid} deleted successfully`
      };
      return DoResponse(data, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route42 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  loader: loader$k
}, Symbol.toStringTag, { value: "Module" }));
const loader$j = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const url = new URL(request.url);
    let criteria = url.searchParams.get("q");
    if (criteria === "" || criteria === null || criteria === void 0) {
      criteria = "";
    }
    let rawdata = await query(`SELECT DISTINCT
            d.*,
            co.name AS country_name,
            st.name AS state_name,
            ci.name AS city_name,
            b.image_url AS image_url 
            FROM tbl_dir d
            LEFT JOIN tbl_country co ON d.country_code = co.iso2
            LEFT JOIN tbl_state st ON d.state_code = st.iso2
            LEFT JOIN tbl_city ci ON d.city_id = ci.id
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            (d.title RLIKE ?
            OR d.short_description RLIKE ?
            OR d.category RLIKE ?
            )
            GROUP BY 
            d.gid
            ORDER BY
            d.date_created
            ASC
            LIMIT 0, 50`, [criteria, criteria, criteria]);
    if (criteria === "" || criteria === null || criteria === void 0) {
      rawdata = await query(`SELECT DISTINCT
                d.*,
                co.name AS country_name,
                st.name AS state_name,
                ci.name AS city_name,
                b.image_url AS image_url 
                FROM tbl_dir d
                LEFT JOIN tbl_country co ON d.country_code = co.iso2
                LEFT JOIN tbl_state st ON d.state_code = st.iso2
                LEFT JOIN tbl_city ci ON d.city_id = ci.id
                LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
                GROUP BY 
                d.gid
                ORDER BY
                d.date_created
                ASC
                LIMIT 0, 50`);
    }
    const listings = rawdata.map((listing) => {
      delete listing.date_created;
      delete listing.last_updated;
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route43 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$j
}, Symbol.toStringTag, { value: "Module" }));
const loader$i = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const owner = params.guid;
    const rows = await query(`SELECT d.* 
            FROM tbl_dir d
            WHERE owner = ?`, [owner]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return GetResponse(listings, true, 200);
  } catch (error) {
    console.log(error.message);
    return GetResponse({ "error": error.message }, false, 200);
  }
};
const route44 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$i
}, Symbol.toStringTag, { value: "Module" }));
const loader$h = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const buid = params.buid;
  const user_guid = params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            AND 
            user_guid = ?
            ORDER BY date_created DESC`, [buid, user_guid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route45 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$h
}, Symbol.toStringTag, { value: "Module" }));
const loader$g = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const url = new URL(request.url);
    let userGuid = url.searchParams.get("user_guid");
    let businessGuid = url.searchParams.get("business_guid");
    let rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    if (rows.length <= 0) {
      {
      }
      await query(`INSERT INTO tbl_operating_hours 
            SET 
            user_guid = ?,  
            business_guid = ?
            `, [userGuid, businessGuid]);
      rows = await query(`SELECT * FROM tbl_operating_hours 
            WHERE 
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    }
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$3 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const url = new URL(request.url);
      let userGuid = url.searchParams.get("user_guid");
      let businessGuid = url.searchParams.get("business_guid");
      const body = await request.json();
      const workingHours = body.workingHours;
      {
      }
      const ophours = await query(`SELECT * FROM 
                tbl_operating_hours WHERE
                user_guid = ?
                AND
                business_guid = ?`, [userGuid, businessGuid]);
      if (ophours.length <= 0) {
        return DoResponse({ error: "Operating hours not yet created" }, 400);
      }
      {
      }
      const ophour = ophours[0];
      const open_status = body.openStatus === void 0 ? ophour.open_status : body.openStatus;
      const monday_from = workingHours.Monday.start === void 0 ? ophour.monday_from : workingHours.Monday.start;
      const monday_to = workingHours.Monday.end === void 0 ? ophour.monday_to : workingHours.Monday.end;
      const tuesday_from = workingHours.Tuesday.start === void 0 ? ophour.tuesday_from : workingHours.Tuesday.start;
      const tuesday_to = workingHours.Tuesday.end === void 0 ? ophour.tuesday_to : workingHours.Tuesday.end;
      const wednesday_from = workingHours.Wednesday.start === void 0 ? ophour.wednesday_from : workingHours.Wednesday.start;
      const wednesday_to = workingHours.Wednesday.end === void 0 ? ophour.wednesday_to : workingHours.Wednesday.end;
      const thursday_from = workingHours.Thursday.start === void 0 ? ophour.thursday_from : workingHours.Thursday.start;
      const thursday_to = workingHours.Thursday.end === void 0 ? ophour.thursday_to : workingHours.Thursday.end;
      const friday_from = workingHours.Friday.start === void 0 ? ophour.friday_from : workingHours.Friday.start;
      const friday_to = workingHours.Friday.end === void 0 ? ophour.friday_to : workingHours.Friday.end;
      const saturday_from = workingHours.Saturday.start === void 0 ? ophour.saturday_from : workingHours.Saturday.start;
      const saturday_to = workingHours.Saturday.end === void 0 ? ophour.saturday_to : workingHours.Saturday.end;
      const sunday_from = workingHours.Sunday.start === void 0 ? ophour.sunday_from : workingHours.Sunday.start;
      const sunday_to = workingHours.Sunday.end === void 0 ? ophour.sunday_to : workingHours.Sunday.end;
      const update = await query(
        `UPDATE tbl_operating_hours SET
                open_status = ?,
                monday_from = ?,
                monday_to = ?,
                tuesday_from = ?,
                tuesday_to = ?,
                wednesday_from = ?,
                wednesday_to = ?,
                thursday_from = ?,
                thursday_to = ?,
                friday_from = ?,
                friday_to = ?,
                saturday_from = ?,
                saturday_to = ?,
                sunday_from = ?,
                sunday_to = ? 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
        [
          open_status,
          monday_from,
          monday_to,
          tuesday_from,
          tuesday_to,
          wednesday_from,
          wednesday_to,
          thursday_from,
          thursday_to,
          friday_from,
          friday_to,
          saturday_from,
          saturday_to,
          sunday_from,
          sunday_to,
          userGuid,
          businessGuid
        ]
      );
      return DoResponse({
        success: true,
        message: "Request received successfully",
        workingHours: {
          businessGuid,
          userGuid,
          open_status,
          workingHours: {
            Monday: {
              monday_from,
              monday_to
            },
            Tuesday: {
              tuesday_from,
              tuesday_to
            },
            Wednesday: {
              wednesday_from,
              wednesday_to
            },
            Thursday: {
              thursday_from,
              thursday_to
            },
            Friday: {
              friday_from,
              friday_to
            },
            Saturday: {
              saturday_from,
              saturday_to
            },
            Sunday: {
              sunday_from,
              sunday_to
            }
          }
        }
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route46 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  loader: loader$g
}, Symbol.toStringTag, { value: "Module" }));
const loader$f = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_sys_facility_features`);
    console.log(rawdata);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route47 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$f
}, Symbol.toStringTag, { value: "Module" }));
const loader$e = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(
      `SELECT * FROM tbl_selected_facility_features 
            WHERE
            user_guid = ?
            AND
            business_guid = ?`,
      [
        userGuid,
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route48 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$e
}, Symbol.toStringTag, { value: "Module" }));
const loader$d = async ({ request, params }) => {
  request.headers.get("Content-Type");
  params.buid;
  params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_selected_facility_features`);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
async function action$2({ request, params }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      const userGuid = body.user_guid;
      const businessGuid = body.business_guid;
      const selected = body.selected;
      console.log(body);
      await query(`DELETE FROM tbl_selected_facility_features 
                WHERE 
                user_guid = ? 
                AND 
                business_guid = ?
                `, [userGuid, businessGuid]);
      if (selected.length > 0) {
        const vals = selected.map(async (feature) => {
          try {
            const guid = crypto.randomUUID();
            await query(
              `INSERT INTO tbl_selected_facility_features 
                    (user_guid, business_guid, feature_id, user_description, guid) VALUES (?, ?, ?, ?, ?)`,
              [userGuid, businessGuid, feature.feature_id, feature.user_description, guid]
            );
          } catch (error) {
            console.log(">>>>>bumbum");
            return DoResponse({ error: error.message }, 405);
          }
        });
      }
      const gid = crypto.randomUUID();
      const data = {
        message: "Features added successfully",
        data: body,
        user_guid: userGuid,
        business_guid: businessGuid
      };
      return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
      console.log(error.message);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
}
const route49 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  loader: loader$d
}, Symbol.toStringTag, { value: "Module" }));
const loader$c = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  const userGuid = params.user_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_dir 
            WHERE 
            gid = ? 
            AND 
            owner = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const action$1 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "PUT") {
    try {
      {
      }
      const body = await request.json();
      let userGuid = params.user_guid;
      let businessGuid = params.business_guid;
      {
      }
      const listings = await query(`SELECT * FROM tbl_dir 
                WHERE
                owner = ?
                AND
                gid = ?`, [userGuid, businessGuid]);
      const listing = listings[0];
      if (listings.length <= 0) {
        return DoResponse({ error: "Business does not exist" }, 400);
      }
      {
      }
      let active = body.active === void 0 ? listing.active : body.active;
      const result = await query(
        `UPDATE tbl_dir SET
                active_status = ? 
                WHERE owner = ?
                AND
                gid = ?`,
        [
          active,
          userGuid,
          businessGuid
        ]
      );
      return DoResponse({
        success: true,
        message: `User ${active ? "activated" : "deactivated"} successfully`,
        user: body
      }, 200);
    } catch (error) {
      console.log(error.message);
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
const route50 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  loader: loader$c
}, Symbol.toStringTag, { value: "Module" }));
const loader$b = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(`SELECT * FROM tbl_business_gallery_image 
            WHERE 
            business_guid = ? 
            ORDER BY date_created DESC`, [businessGuid]);
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route51 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$b
}, Symbol.toStringTag, { value: "Module" }));
const loader$a = async ({ request, params }) => {
  request.headers.get("Content-Type");
  const businessGuid = params.business_guid;
  try {
    const rawdata = await query(
      `SELECT 
            a.feature_id, b.description, a.user_description, 
            a.business_guid, b.name 
            FROM 
            tbl_selected_facility_features a, tbl_sys_facility_features b 
            WHERE a.feature_id = b.feature_id 
            AND
            a.business_guid = ?`,
      [
        businessGuid
      ]
    );
    return DoResponse(rawdata, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route52 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$a
}, Symbol.toStringTag, { value: "Module" }));
const loader$9 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const category = params.category;
    const limit = Number(params.limit) || 5;
    const rows = await query(`SELECT 
            d.*, 
            avg_ratings.avg_rating,
            b.image_url
            FROM tbl_dir d
            LEFT JOIN (
                SELECT business_guid, AVG(rating) AS avg_rating
                FROM tbl_rating
                GROUP BY business_guid
            ) AS avg_ratings ON d.gid = avg_ratings.business_guid
            LEFT JOIN tbl_business_profile_image b ON b.business_guid = d.gid
            WHERE d.category = ?
            LIMIT 0, ?`, [category, limit]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route53 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$9
}, Symbol.toStringTag, { value: "Module" }));
const loader$8 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const id = params.guid_or_username;
    const isFeatured = true;
    const rows = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != ''
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.featured = ?)
            ORDER BY RAND()
            LIMIT 0, 10
            `, [isFeatured]);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const listings = rows.map((listing) => {
      return listing;
    });
    return DoResponse(listings, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route54 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
const loader$7 = async ({ request, params }) => {
  return DoResponse({
    success: false,
    message: "method not allowed"
  }, 405);
};
async function action({ request }) {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse({ error: "Invalid content type. Expected JSON." }, 500);
  }
  if (request.method === "POST") {
    try {
      const body = await request.json();
      if (!body.business_guid) {
        return DoResponse({ error: "Please fill all information!" }, 400);
      }
      if (!body.user_guid) {
        return DoResponse({ error: "User GUID empty!" }, 400);
      }
      if (!body.rating) {
        return DoResponse({ error: "Rating empty!" }, 400);
      }
      if (!body.comment) {
        return DoResponse({ error: "Please enter comment!" }, 400);
      }
      if (!body.fullname) {
        return DoResponse({ error: "Please enter full name!" }, 400);
      }
      const userGuid = body.user_guid;
      const businsessGuid = body.business_guid;
      const rating = body.rating;
      const comment = body.comment;
      const fullname = body.fullname;
      const ratingGuid = crypto.randomUUID();
      {
      }
      const rows = await query(
        `SELECT * FROM tbl_rating 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
        [
          userGuid,
          businsessGuid
        ]
      );
      if (rows.length > 0) {
        {
        }
        const result = await query(
          `UPDATE tbl_rating 
                    SET 
                    rating = ?, 
                    comment = ?, 
                    fullname = ?  
                    WHERE
                    user_guid = ? 
                    AND 
                    business_guid = ?`,
          [
            rating,
            comment,
            fullname,
            userGuid,
            businsessGuid
          ]
        );
      } else {
        {
        }
        const result = await query(
          `INSERT INTO tbl_rating 
                    (rating, comment, fullname, user_guid, business_guid, rating_guid)
                    VALUES
                    (?, ?, ?, ?, ?, ?)`,
          [
            rating,
            comment,
            fullname,
            userGuid,
            businsessGuid,
            ratingGuid
          ]
        );
      }
      let responseData = null;
      if (rows.length > 0) {
        body.rating_guid = rows[0].rating_guid;
        responseData = {
          success: true,
          message: "rating updated successfully",
          data: body
        };
      } else {
        body.rating_guid = ratingGuid;
        responseData = {
          success: true,
          message: "rating created successfully",
          data: body
        };
      }
      return DoResponse(responseData, 200);
    } catch (error) {
      return DoResponse({ error: error.message }, 500);
    }
  }
  return DoResponse({ error: "method not allowed" }, 200);
}
const route55 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
const loader$6 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const userGuid = params.user_guid;
    const businessGuid = params.business_guid;
    const rows = await query(`SELECT * from tbl_rating
            WHERE
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid]);
    if (rows.length <= 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route56 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const businessGuid = params.business_guid;
    const rows = await query(`SELECT DISTINCT
                r.rating,
                r.fullname,
                r.comment,
                r.created_at,
                r.updated_at,
                up.image_url,
                co.name AS country_name,
                st.name AS state_name,
                ci.name AS city_name
                FROM tbl_rating r
                JOIN tbl_user u ON r.user_guid = u.user_guid
                LEFT JOIN tbl_user_profile_image up ON r.user_guid = up.user_guid
                LEFT JOIN tbl_country co ON u.country_code = co.iso2
                LEFT JOIN tbl_state st ON u.state_code = st.iso2
                LEFT JOIN tbl_city ci ON u.city_id = ci.id
                WHERE r.business_guid = ?
                GROUP BY 
                r.rating_guid`, [businessGuid]);
    if (rows.length <= 0) {
      return DoResponse([], 200);
    }
    return DoResponse(rows, 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route57 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }));
  }
  try {
    const businessGuid = params.business_guid;
    const rows = await query(
      `SELECT 
            AVG(a.rating) as rating_average,
            SUM(a.rating) as rating_sum, 
            COUNT(a.rating) AS rating_count 
            FROM 
            tbl_rating a 
            WHERE 
            a.business_guid = ?`,
      [businessGuid]
    );
    return DoResponse(rows[0], 200);
  } catch (error) {
    return DoResponse({ "error": error.message }, 500);
  }
};
const route58 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get("country_code");
    const rows = await query(`SELECT * FROM tbl_state WHERE country_code = ?`, [countryCode]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    const states = rows.map((state) => {
      return {
        name: state.name,
        country_code: state.country_code,
        id: state.iso2
      };
    });
    return DoResponse(states, 200);
  }
};
const route59 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_country`);
    if (rows.length <= 0) {
      return DoResponse({}, 200);
    }
    const countries = rows.map((country) => {
      return {
        name: country.name,
        id: country.iso2
      };
    });
    return DoResponse(countries, 200);
  }
};
const route60 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const url = new URL(request.url);
    const countryCode = url.searchParams.get("country_code");
    const stateCode = url.searchParams.get("state_code");
    console.log(`statecode: ${stateCode}`);
    console.log(`countrycode: ${countryCode}`);
    const rows = await query(`SELECT * FROM tbl_city 
            WHERE
            country_code = ?
            AND
            state_code = ?`, [countryCode, stateCode]);
    if (rows.length <= 0) {
      return DoResponse([{}], 200);
    }
    const cities = rows.map((city) => {
      return {
        name: city.name,
        country_code: city.country_code,
        state_code: city.state_code,
        id: city.id
      };
    });
    return DoResponse(cities, 200);
  }
};
const route61 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const loader = async ({ request, params }) => {
  const contentType = request.headers.get("Content-Type");
  if (contentType !== "application/json") {
    return DoResponse(
      { error: "Invalid content type. Expected JSON." }
    );
  }
  if (request.method === "GET") {
    const rows = await query(`SELECT * FROM tbl_category`);
    if (rows.length <= 0) {
      return GetResponse([{}], true, 200);
    }
    return GetResponse(rows, true, 200);
  }
};
const route62 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DEkpoqDg.js", "imports": ["/assets/components-B3s0IpTW.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-KiZgygy-.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/AddPhotoDialogContext-DilgpC1R.js", "/assets/SliderContext-DisLTAdC.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-CB7nKGqz.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-BLFHDWCD.js", "/assets/index-CDpADjvc.js"], "css": ["/assets/root-D_90K06R.css"] }, "routes/listing": { "id": "routes/listing", "parentId": "root", "path": "listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cxzd9cUg.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/Footer-DUS_llFQ.js", "/assets/LatestStarRating-BDPz__Nt.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-mlrjDXrT.js", "/assets/SliderContext-DisLTAdC.js", "/assets/index-CB7nKGqz.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/index-DAH1x-Px.js", "/assets/index-BLFHDWCD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/SearchBox-Dvw5_xIS.js"], "css": [] }, "routes/resetpw": { "id": "routes/resetpw", "parentId": "root", "path": "resetpw", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C_be0DrW.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-DAH1x-Px.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": "/", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BfqpDoVn.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/index-CIOWmsy1.js", "/assets/SearchBox-Dvw5_xIS.js", "/assets/Lib-DgMjv0aD.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-iQjKtXz0.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/Footer-DUS_llFQ.js", "/assets/LatestStarRating-BDPz__Nt.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-mlrjDXrT.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/SearchBox-Dvw5_xIS.js", "/assets/index-BLFHDWCD.js"], "css": [] }, "routes/listing/index": { "id": "routes/listing/index", "parentId": "root", "path": "/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cxzd9cUg.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/Footer-DUS_llFQ.js", "/assets/LatestStarRating-BDPz__Nt.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-mlrjDXrT.js", "/assets/SliderContext-DisLTAdC.js", "/assets/index-CB7nKGqz.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/index-DAH1x-Px.js", "/assets/index-BLFHDWCD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/SearchBox-Dvw5_xIS.js"], "css": [] }, "routes/signin/Signin": { "id": "routes/signin/Signin", "parentId": "root", "path": "/signin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Signin-1FGCXz6M.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-DAH1x-Px.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/signup/Signup": { "id": "routes/signup/Signup", "parentId": "root", "path": "/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/Signup-Bpv8aziz.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-DAH1x-Px.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/signup/SignupCode": { "id": "routes/signup/SignupCode", "parentId": "root", "path": "/signup/code/:user_hash", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/SignupCode-BUxGyirW.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/signup/SignupComplete": { "id": "routes/signup/SignupComplete", "parentId": "root", "path": "/signup/complete", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/SignupComplete-CkScyWNS.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-CDpADjvc.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js"], "css": [] }, "routes/resetpw/index": { "id": "routes/resetpw/index", "parentId": "root", "path": "/resetpw", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C_be0DrW.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-DAH1x-Px.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/resetpw/resetpw": { "id": "routes/resetpw/resetpw", "parentId": "root", "path": "/resetpw/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/resetpw-2Tk7Osfa.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-DAH1x-Px.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Lib-DgMjv0aD.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/landing/change_email/index": { "id": "routes/landing/change_email/index", "parentId": "root", "path": "/landing/change_email", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-blK5vmKb.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-CDpADjvc.js", "/assets/index-mlrjDXrT.js", "/assets/index-CB7nKGqz.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js"], "css": [] }, "routes/landing/reset_password/index": { "id": "routes/landing/reset_password/index", "parentId": "root", "path": "/landing/reset_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-D1zJG2Mc.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ResponsiveNav-BxZdnQvy.js", "/assets/index-DAH1x-Px.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Lib-DgMjv0aD.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js"], "css": [] }, "routes/account/pages/home/index": { "id": "routes/account/pages/home/index", "parentId": "root", "path": "account", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BYsTmpz7.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/Lib-DgMjv0aD.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Businesses-DdknKuq3.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/addbusiness/index": { "id": "routes/account/pages/addbusiness/index", "parentId": "root", "path": "account/add-business", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DsjkKEfu.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/index-DAH1x-Px.js", "/assets/Lib-DgMjv0aD.js", "/assets/Button-P7evaT8k.js", "/assets/Select-DE8yix5g.js", "/assets/index-CB7nKGqz.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/account/pages/businesses/index": { "id": "routes/account/pages/businesses/index", "parentId": "root", "path": "account/businesses", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-pmnkUulT.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Lib-DgMjv0aD.js", "/assets/Businesses-DdknKuq3.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/business/index": { "id": "routes/account/pages/business/index", "parentId": "root", "path": "account/businesses/:guid/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BEKkkhJW.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/BusinessMenu-Dy3rzcrD.js", "/assets/index-DAH1x-Px.js", "/assets/Button-P7evaT8k.js", "/assets/Select-DE8yix5g.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-CB7nKGqz.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/account/pages/business/pages/settings/index": { "id": "routes/account/pages/business/pages/settings/index", "parentId": "root", "path": "account/businesses/:business_guid/:user_guid/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DJCVf4PY.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/index-DAH1x-Px.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/BusinessMenu-Dy3rzcrD.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/business/pages/gallery/index": { "id": "routes/account/pages/business/pages/gallery/index", "parentId": "root", "path": "account/businesses/:business_guid/:user_guid/gallery", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-q-M9ac6A.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/BusinessMenu-Dy3rzcrD.js", "/assets/index-BLFHDWCD.js", "/assets/AddPhotoDialogContext-DilgpC1R.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/SliderContext-DisLTAdC.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Lib-DgMjv0aD.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/business/pages/facilities/index": { "id": "routes/account/pages/business/pages/facilities/index", "parentId": "root", "path": "account/businesses/:business_guid/:user_guid/facilities", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BYlzY5Qy.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/BusinessMenu-Dy3rzcrD.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/business/pages/activate/index": { "id": "routes/account/pages/business/pages/activate/index", "parentId": "root", "path": "account/businesses/:business_guid/:user_guid/activate", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BKgXmgbU.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/BusinessMenu-Dy3rzcrD.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/Lib-DgMjv0aD.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/profile/index": { "id": "routes/account/pages/profile/index", "parentId": "root", "path": "account/profile/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CPZPnxNZ.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/index-DAH1x-Px.js", "/assets/Button-P7evaT8k.js", "/assets/Select-DE8yix5g.js", "/assets/Lib-DgMjv0aD.js", "/assets/index-CB7nKGqz.js", "/assets/NotificationContext-7wGW9xfz.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js"], "css": [] }, "routes/account/pages/email/index": { "id": "routes/account/pages/email/index", "parentId": "root", "path": "account/email/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B5i0Yplp.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/index-DAH1x-Px.js", "/assets/Button-P7evaT8k.js", "/assets/Lib-DgMjv0aD.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/changepw/index": { "id": "routes/account/pages/changepw/index", "parentId": "root", "path": "account/change-password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Cl8aPvsg.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/index-DAH1x-Px.js", "/assets/Button-P7evaT8k.js", "/assets/Lib-DgMjv0aD.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/resetpw/index": { "id": "routes/account/pages/resetpw/index", "parentId": "root", "path": "account/reset-password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DrEvTinH.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/index-DAH1x-Px.js", "/assets/Button-P7evaT8k.js", "/assets/Lib-DgMjv0aD.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/account/pages/deactivateuser/index": { "id": "routes/account/pages/deactivateuser/index", "parentId": "root", "path": "account/deactivate-user/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BpKrfH1g.js", "imports": ["/assets/components-B3s0IpTW.js", "/assets/ProfileLayout-Dz9uAm-j.js", "/assets/index-DAH1x-Px.js", "/assets/Button-P7evaT8k.js", "/assets/Lib-DgMjv0aD.js", "/assets/AuthContext-8FHLzqeM.js", "/assets/Footer-DUS_llFQ.js", "/assets/MobileNav-Cg3_Ddfq.js", "/assets/iconBase-Bk1nv4PK.js", "/assets/index-CIOWmsy1.js", "/assets/index-CDpADjvc.js", "/assets/index-CB7nKGqz.js"], "css": [] }, "routes/api/users/index": { "id": "routes/api/users/index", "parentId": "root", "path": "api/users", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/user": { "id": "routes/api/users/user", "parentId": "root", "path": "api/users/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/signin": { "id": "routes/api/users/signin", "parentId": "root", "path": "api/users/signin", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/signin-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/verifytoken": { "id": "routes/api/users/verifytoken", "parentId": "root", "path": "api/users/verifytoken", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/verifytoken-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/change_password": { "id": "routes/api/users/change_password", "parentId": "root", "path": "api/users/change_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_password-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/reset_password_request": { "id": "routes/api/users/reset_password_request", "parentId": "root", "path": "api/users/reset_password_request", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/reset_password_request-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/reset_password": { "id": "routes/api/users/reset_password", "parentId": "root", "path": "api/users/reset_password/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/reset_password-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/change_email_request": { "id": "routes/api/users/change_email_request", "parentId": "root", "path": "api/users/change_email_request", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_email_request-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/change_email": { "id": "routes/api/users/change_email", "parentId": "root", "path": "api/users/change_email", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/change_email-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/activate_deactivate": { "id": "routes/api/users/activate_deactivate", "parentId": "root", "path": "api/users/activate_deactivate/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/activate_deactivate-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/user_by_user_hash": { "id": "routes/api/users/user_by_user_hash", "parentId": "root", "path": "api/users/user_by_user_hash/:user_hash", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user_by_user_hash-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/verify_signup": { "id": "routes/api/users/verify_signup", "parentId": "root", "path": "api/users/verify_signup/:user_hash", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/verify_signup-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/users/user_profile_image": { "id": "routes/api/users/user_profile_image", "parentId": "root", "path": "api/users/user_profile_image/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/user_profile_image-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/business_profile_image": { "id": "routes/api/listings/business_profile_image", "parentId": "root", "path": "api/listings/business_profile_image/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_profile_image-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/index": { "id": "routes/api/listings/index", "parentId": "root", "path": "api/listings", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DP2rzg_V.js", "imports": [], "css": [] }, "routes/api/listings/listing": { "id": "routes/api/listings/listing", "parentId": "root", "path": "api/listings/:guid_or_username", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/search": { "id": "routes/api/listings/search", "parentId": "root", "path": "api/listings/search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/owner/index": { "id": "routes/api/listings/owner/index", "parentId": "root", "path": "api/listings/owner/:guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-K6Dvbx-E.js", "imports": [], "css": [] }, "routes/api/listings/gallery": { "id": "routes/api/listings/gallery", "parentId": "root", "path": "api/listings/gallery/:buid/:user_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/gallery-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/operating_hours": { "id": "routes/api/listings/operating_hours", "parentId": "root", "path": "api/listings/operating_hours", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/operating_hours-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/sys_facility_features/index": { "id": "routes/api/listings/sys_facility_features/index", "parentId": "root", "path": "api/listings/sys_facility_features", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-C6Kfwj0f.js", "imports": [], "css": [] }, "routes/api/listings/selected_facility_features/selected_facility_features": { "id": "routes/api/listings/selected_facility_features/selected_facility_features", "parentId": "root", "path": "api/listings/selected_facility_features/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/selected_facility_features-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/selected_facility_features/index": { "id": "routes/api/listings/selected_facility_features/index", "parentId": "root", "path": "api/listings/selected_facility_features", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-RnTpOC5-.js", "imports": [], "css": [] }, "routes/api/listings/activate/activate": { "id": "routes/api/listings/activate/activate", "parentId": "root", "path": "api/listings/activate/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/activate-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/business_gallery": { "id": "routes/api/listings/business_gallery", "parentId": "root", "path": "api/listings/business_gallery/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_gallery-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/business_facility_features": { "id": "routes/api/listings/business_facility_features", "parentId": "root", "path": "api/listings/business_facility_features/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_facility_features-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/listing_by_category": { "id": "routes/api/listings/listing_by_category", "parentId": "root", "path": "api/listings/listing_by_category/:category/:limit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/listing_by_category-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/listings/featured_listing": { "id": "routes/api/listings/featured_listing", "parentId": "root", "path": "api/listings/featured_listing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/featured_listing-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/ratings/index": { "id": "routes/api/ratings/index", "parentId": "root", "path": "api/rating", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DVN7Oi2P.js", "imports": [], "css": [] }, "routes/api/ratings/rating": { "id": "routes/api/ratings/rating", "parentId": "root", "path": "api/rating/:user_guid/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/rating-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/ratings/business_ratings": { "id": "routes/api/ratings/business_ratings", "parentId": "root", "path": "api/rating/business_ratings/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/business_ratings-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/ratings/ratings_reviews": { "id": "routes/api/ratings/ratings_reviews", "parentId": "root", "path": "api/rating/ratings_reviews/:business_guid", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/ratings_reviews-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/state": { "id": "routes/api/util/state", "parentId": "root", "path": "api/util/state", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/state-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/country": { "id": "routes/api/util/country", "parentId": "root", "path": "api/util/country", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/country-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/city": { "id": "routes/api/util/city", "parentId": "root", "path": "api/util/city", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/city-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/api/util/category": { "id": "routes/api/util/category", "parentId": "root", "path": "api/util/category", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category-l0sNRNKZ.js", "imports": [], "css": [] } }, "url": "/assets/manifest-b2875b38.js", "version": "b2875b38" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/listing": {
    id: "routes/listing",
    parentId: "root",
    path: "listing",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/resetpw": {
    id: "routes/resetpw",
    parentId: "root",
    path: "resetpw",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: "/",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/listing/index": {
    id: "routes/listing/index",
    parentId: "root",
    path: "/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/signin/Signin": {
    id: "routes/signin/Signin",
    parentId: "root",
    path: "/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/signup/Signup": {
    id: "routes/signup/Signup",
    parentId: "root",
    path: "/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/signup/SignupCode": {
    id: "routes/signup/SignupCode",
    parentId: "root",
    path: "/signup/code/:user_hash",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/signup/SignupComplete": {
    id: "routes/signup/SignupComplete",
    parentId: "root",
    path: "/signup/complete",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/resetpw/index": {
    id: "routes/resetpw/index",
    parentId: "root",
    path: "/resetpw",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/resetpw/resetpw": {
    id: "routes/resetpw/resetpw",
    parentId: "root",
    path: "/resetpw/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/landing/change_email/index": {
    id: "routes/landing/change_email/index",
    parentId: "root",
    path: "/landing/change_email",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/landing/reset_password/index": {
    id: "routes/landing/reset_password/index",
    parentId: "root",
    path: "/landing/reset_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/account/pages/home/index": {
    id: "routes/account/pages/home/index",
    parentId: "root",
    path: "account",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/account/pages/addbusiness/index": {
    id: "routes/account/pages/addbusiness/index",
    parentId: "root",
    path: "account/add-business",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/account/pages/businesses/index": {
    id: "routes/account/pages/businesses/index",
    parentId: "root",
    path: "account/businesses",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/account/pages/business/index": {
    id: "routes/account/pages/business/index",
    parentId: "root",
    path: "account/businesses/:guid/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/account/pages/business/pages/settings/index": {
    id: "routes/account/pages/business/pages/settings/index",
    parentId: "root",
    path: "account/businesses/:business_guid/:user_guid/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/account/pages/business/pages/gallery/index": {
    id: "routes/account/pages/business/pages/gallery/index",
    parentId: "root",
    path: "account/businesses/:business_guid/:user_guid/gallery",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/account/pages/business/pages/facilities/index": {
    id: "routes/account/pages/business/pages/facilities/index",
    parentId: "root",
    path: "account/businesses/:business_guid/:user_guid/facilities",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/account/pages/business/pages/activate/index": {
    id: "routes/account/pages/business/pages/activate/index",
    parentId: "root",
    path: "account/businesses/:business_guid/:user_guid/activate",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/account/pages/profile/index": {
    id: "routes/account/pages/profile/index",
    parentId: "root",
    path: "account/profile/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/account/pages/email/index": {
    id: "routes/account/pages/email/index",
    parentId: "root",
    path: "account/email/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  },
  "routes/account/pages/changepw/index": {
    id: "routes/account/pages/changepw/index",
    parentId: "root",
    path: "account/change-password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route24
  },
  "routes/account/pages/resetpw/index": {
    id: "routes/account/pages/resetpw/index",
    parentId: "root",
    path: "account/reset-password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route25
  },
  "routes/account/pages/deactivateuser/index": {
    id: "routes/account/pages/deactivateuser/index",
    parentId: "root",
    path: "account/deactivate-user/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route26
  },
  "routes/api/users/index": {
    id: "routes/api/users/index",
    parentId: "root",
    path: "api/users",
    index: void 0,
    caseSensitive: void 0,
    module: route27
  },
  "routes/api/users/user": {
    id: "routes/api/users/user",
    parentId: "root",
    path: "api/users/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route28
  },
  "routes/api/users/signin": {
    id: "routes/api/users/signin",
    parentId: "root",
    path: "api/users/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route29
  },
  "routes/api/users/verifytoken": {
    id: "routes/api/users/verifytoken",
    parentId: "root",
    path: "api/users/verifytoken",
    index: void 0,
    caseSensitive: void 0,
    module: route30
  },
  "routes/api/users/change_password": {
    id: "routes/api/users/change_password",
    parentId: "root",
    path: "api/users/change_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route31
  },
  "routes/api/users/reset_password_request": {
    id: "routes/api/users/reset_password_request",
    parentId: "root",
    path: "api/users/reset_password_request",
    index: void 0,
    caseSensitive: void 0,
    module: route32
  },
  "routes/api/users/reset_password": {
    id: "routes/api/users/reset_password",
    parentId: "root",
    path: "api/users/reset_password/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route33
  },
  "routes/api/users/change_email_request": {
    id: "routes/api/users/change_email_request",
    parentId: "root",
    path: "api/users/change_email_request",
    index: void 0,
    caseSensitive: void 0,
    module: route34
  },
  "routes/api/users/change_email": {
    id: "routes/api/users/change_email",
    parentId: "root",
    path: "api/users/change_email",
    index: void 0,
    caseSensitive: void 0,
    module: route35
  },
  "routes/api/users/activate_deactivate": {
    id: "routes/api/users/activate_deactivate",
    parentId: "root",
    path: "api/users/activate_deactivate/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route36
  },
  "routes/api/users/user_by_user_hash": {
    id: "routes/api/users/user_by_user_hash",
    parentId: "root",
    path: "api/users/user_by_user_hash/:user_hash",
    index: void 0,
    caseSensitive: void 0,
    module: route37
  },
  "routes/api/users/verify_signup": {
    id: "routes/api/users/verify_signup",
    parentId: "root",
    path: "api/users/verify_signup/:user_hash",
    index: void 0,
    caseSensitive: void 0,
    module: route38
  },
  "routes/api/users/user_profile_image": {
    id: "routes/api/users/user_profile_image",
    parentId: "root",
    path: "api/users/user_profile_image/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route39
  },
  "routes/api/listings/business_profile_image": {
    id: "routes/api/listings/business_profile_image",
    parentId: "root",
    path: "api/listings/business_profile_image/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route40
  },
  "routes/api/listings/index": {
    id: "routes/api/listings/index",
    parentId: "root",
    path: "api/listings",
    index: void 0,
    caseSensitive: void 0,
    module: route41
  },
  "routes/api/listings/listing": {
    id: "routes/api/listings/listing",
    parentId: "root",
    path: "api/listings/:guid_or_username",
    index: void 0,
    caseSensitive: void 0,
    module: route42
  },
  "routes/api/listings/search": {
    id: "routes/api/listings/search",
    parentId: "root",
    path: "api/listings/search",
    index: void 0,
    caseSensitive: void 0,
    module: route43
  },
  "routes/api/listings/owner/index": {
    id: "routes/api/listings/owner/index",
    parentId: "root",
    path: "api/listings/owner/:guid",
    index: void 0,
    caseSensitive: void 0,
    module: route44
  },
  "routes/api/listings/gallery": {
    id: "routes/api/listings/gallery",
    parentId: "root",
    path: "api/listings/gallery/:buid/:user_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route45
  },
  "routes/api/listings/operating_hours": {
    id: "routes/api/listings/operating_hours",
    parentId: "root",
    path: "api/listings/operating_hours",
    index: void 0,
    caseSensitive: void 0,
    module: route46
  },
  "routes/api/listings/sys_facility_features/index": {
    id: "routes/api/listings/sys_facility_features/index",
    parentId: "root",
    path: "api/listings/sys_facility_features",
    index: void 0,
    caseSensitive: void 0,
    module: route47
  },
  "routes/api/listings/selected_facility_features/selected_facility_features": {
    id: "routes/api/listings/selected_facility_features/selected_facility_features",
    parentId: "root",
    path: "api/listings/selected_facility_features/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route48
  },
  "routes/api/listings/selected_facility_features/index": {
    id: "routes/api/listings/selected_facility_features/index",
    parentId: "root",
    path: "api/listings/selected_facility_features",
    index: void 0,
    caseSensitive: void 0,
    module: route49
  },
  "routes/api/listings/activate/activate": {
    id: "routes/api/listings/activate/activate",
    parentId: "root",
    path: "api/listings/activate/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route50
  },
  "routes/api/listings/business_gallery": {
    id: "routes/api/listings/business_gallery",
    parentId: "root",
    path: "api/listings/business_gallery/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route51
  },
  "routes/api/listings/business_facility_features": {
    id: "routes/api/listings/business_facility_features",
    parentId: "root",
    path: "api/listings/business_facility_features/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route52
  },
  "routes/api/listings/listing_by_category": {
    id: "routes/api/listings/listing_by_category",
    parentId: "root",
    path: "api/listings/listing_by_category/:category/:limit",
    index: void 0,
    caseSensitive: void 0,
    module: route53
  },
  "routes/api/listings/featured_listing": {
    id: "routes/api/listings/featured_listing",
    parentId: "root",
    path: "api/listings/featured_listing",
    index: void 0,
    caseSensitive: void 0,
    module: route54
  },
  "routes/api/ratings/index": {
    id: "routes/api/ratings/index",
    parentId: "root",
    path: "api/rating",
    index: void 0,
    caseSensitive: void 0,
    module: route55
  },
  "routes/api/ratings/rating": {
    id: "routes/api/ratings/rating",
    parentId: "root",
    path: "api/rating/:user_guid/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route56
  },
  "routes/api/ratings/business_ratings": {
    id: "routes/api/ratings/business_ratings",
    parentId: "root",
    path: "api/rating/business_ratings/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route57
  },
  "routes/api/ratings/ratings_reviews": {
    id: "routes/api/ratings/ratings_reviews",
    parentId: "root",
    path: "api/rating/ratings_reviews/:business_guid",
    index: void 0,
    caseSensitive: void 0,
    module: route58
  },
  "routes/api/util/state": {
    id: "routes/api/util/state",
    parentId: "root",
    path: "api/util/state",
    index: void 0,
    caseSensitive: void 0,
    module: route59
  },
  "routes/api/util/country": {
    id: "routes/api/util/country",
    parentId: "root",
    path: "api/util/country",
    index: void 0,
    caseSensitive: void 0,
    module: route60
  },
  "routes/api/util/city": {
    id: "routes/api/util/city",
    parentId: "root",
    path: "api/util/city",
    index: void 0,
    caseSensitive: void 0,
    module: route61
  },
  "routes/api/util/category": {
    id: "routes/api/util/category",
    parentId: "root",
    path: "api/util/category",
    index: void 0,
    caseSensitive: void 0,
    module: route62
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
