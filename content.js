let videoChannels = {}
let videoNames = {}
const memberHandles = [
  "grian",
  "smallishbeans",
  "dangthatsalongname",
  "bigbst4tz22",
  "ethoslab",
  "bdoubleo",
  "pearlescentmoon",
  "martyn",
  "goodtimeswithscar",
  "impulsesv",
  "tangoteklp",
  "zombiecleo",
  "solidaritygaming",
  "mcskizzleman",
  "rendog",
  "ldshadowlady",
  "thatmumbojumbo",
  "..."
]
const handlesToDisplayNames = {
  "grian": "Grian",
  "smallishbeans": "SmallishBeans",
  "dangthatsalongname": "Smajor",
  "bigbst4tz22": "BigB",
  "ethoslab": "Etho",
  "bdoubleo": "BdoubleO",
  "pearlescentmoon": "PearlescentMoon",
  "martyn": "InTheLittleWood",
  "goodtimeswithscar": "GoodTimesWithScar",
  "impulsesv": "impulseSV",
  "tangoteklp": "Tango Tek",
  "zombiecleo": "ZombieCleo",
  "solidaritygaming": "Solidarity",
  "mcskizzleman": "Skizzleman",
  "ldshadowlady": "LDShadowLady",
  "thatmumbojumbo": "Mumbo Jumbo",
  "rendog": "rendog",
  "...": "..."
}

async function getNameForVideo(video) {
	videoChannels[video] = "https://www.youtube.com/@..."
	let res = await fetch(`https://www.youtube.com/oembed/?url=${video}`)
	let json = await res.json()
	videoChannels[video] = json.author_url
  videoNames[video] = json.title
}

function doesItIncludeOneOfTheSeries(string) {
  string = string.toLowerCase()
  let returnString = ""
  if (string.includes("3rd life")) { returnString = "3rd Life" }
  if (string.includes("last life")) { returnString = "Last Life" }
  if (string.includes("double life")) { returnString = "Double Life" }
  if (string.includes("limited life")) { returnString = "Limited Life" }
  if (returnString) {
    if (string.match(/[0-9]+/) == null && !string.includes(" - youtube") && !string.includes("final")) {
      returnString = ""
    }
  }
  return returnString
}

function isItALifeMembersChannel(url) {
  for (let channel of memberHandles) {
    if (url.toLowerCase() == `https://www.youtube.com/@${channel}`) {
      return true
    }
  }
  return false
}

function censor() {

  // Big thumbnail
  try {
    const includedSeries = doesItIncludeOneOfTheSeries(document.title)
    if (includedSeries) {
      document.title = `${includedSeries} - YouTube`
      document.querySelector(".ytp-cued-thumbnail-overlay").remove()
    }
  } catch {}

  // Channel page videos
  if (document.querySelectorAll("ytd-grid-video-renderer")) {

    for (let video of document.querySelectorAll("ytd-grid-video-renderer")) {
        let videoTitle = video.querySelector("#video-title")
        const includedSeries = doesItIncludeOneOfTheSeries(videoTitle.innerHTML)
        if (includedSeries) {
            try {
                videoTitle.innerHTML = `${includedSeries} Episode ${videoTitle.innerHTML.match(/[0-9]+/)}`
                video.querySelector(".yt-core-image--fill-parent-height").style = "filter: blur(5rem);"
                video.querySelector("#mouseover-overlay").remove()
            } catch { continue }
        }
    }

  }

  // Watch page videos
  if (document.querySelectorAll("ytd-compact-video-renderer")) {

    for (let video of document.querySelectorAll("ytd-compact-video-renderer")) {

			let videoTitle = video.querySelector("#video-title")
			let href = video.querySelector("a#thumbnail").href
      const includedSeries = doesItIncludeOneOfTheSeries(videoTitle.innerHTML)

			if (includedSeries) {
					try {
            if (videoChannels[href] == undefined) {
              getNameForVideo(href)
            }
            if (isItALifeMembersChannel(videoChannels[href])) {
              videoTitle.innerHTML = `${includedSeries} Episode ${videoTitle.innerHTML.match(/[0-9]+/)} - ${handlesToDisplayNames[videoChannels[href].substring(25).toLowerCase()]}`
              video.querySelector(".yt-core-image--fill-parent-height").style = "filter: blur(5rem);"
              video.querySelector("#mouseover-overlay").remove()
            } else {
              videoTitle.innerHTML = videoNames[href]
              video.querySelector(".yt-core-image--fill-parent-height").style = ""
            }
					} catch { continue }
			}

	  }

  }

  // Search
  if (document.querySelectorAll("ytd-video-renderer")) {

    for (let video of document.querySelectorAll("ytd-video-renderer")) {

			let videoTitle = video.querySelector("#video-title")
			let href = video.querySelector("a#thumbnail").href
      const includedSeries = doesItIncludeOneOfTheSeries(videoTitle.innerHTML)

			if (includedSeries) {
					try {
            if (videoChannels[href] == undefined) {
              getNameForVideo(href)
            }
            if (isItALifeMembersChannel(videoChannels[href])) {
              videoTitle.innerHTML = `${includedSeries} Episode ${videoTitle.innerHTML.match(/[0-9]+/)} - ${handlesToDisplayNames[videoChannels[href].substring(25).toLowerCase()]}`
              video.querySelector(".yt-core-image--fill-parent-height").style = "filter: blur(5rem);"
              video.querySelector("ytd-thumbnail").removeAttribute("is-preview-loading")
              video.querySelector(".metadata-snippet-container.style-scope.ytd-video-renderer.style-scope.ytd-video-renderer").style = "display: none;"
            } else {
              videoTitle.innerHTML = videoNames[href]
              video.querySelector(".yt-core-image--fill-parent-height").style = ""
            }
					} catch { continue }
			}

	  }

  }

  // Home and subscriptions
  if (document.querySelectorAll("ytd-rich-grid-media")) {

    for (let video of document.querySelectorAll("ytd-rich-grid-media")) {

			let videoTitle = video.querySelector("#video-title")
			let href = video.querySelector("a#thumbnail").href
      const includedSeries = doesItIncludeOneOfTheSeries(videoTitle.innerHTML)

			if (includedSeries) {
        try {
          if (videoChannels[href] == undefined) {
            getNameForVideo(href)
          }
          if (isItALifeMembersChannel(videoChannels[href])) {
            videoTitle.innerHTML = `${includedSeries} Episode ${videoTitle.innerHTML.match(/[0-9]+/)} - ${handlesToDisplayNames[videoChannels[href].substring(25).toLowerCase()]}`
            video.querySelector(".yt-core-image--fill-parent-height").style = "filter: blur(5rem);"
            video.querySelector("#mouseover-overlay").remove()
          } else {
            videoTitle.innerHTML = videoNames[href]
            video.querySelector(".yt-core-image--fill-parent-height").style = ""
          }
        } catch { continue }
			}

	  }

  }

  // Playlist
  if (document.querySelectorAll("ytd-playlist-panel-video-renderer")) {

    for (let video of document.querySelectorAll("ytd-playlist-panel-video-renderer")) {
			let videoTitle = video.querySelector("#video-title")
      const includedSeries = doesItIncludeOneOfTheSeries(videoTitle.innerHTML)
			if (includedSeries) {
					try {
							videoTitle.innerHTML = `${includedSeries} Episode ${videoTitle.innerHTML.match(/[0-9]+/)} - ${videoChannels[href]}`
							video.querySelector(".yt-core-image--fill-parent-height").style = "filter: blur(5rem);"
							video.querySelector("#mouseover-overlay").remove()
					} catch {}
			}
	  }

  }

  // Title description and comments
  let videoTitle = document.querySelector("h1.style-scope.ytd-watch-metadata")
  if (videoTitle) {

    try {

    if (doesItIncludeOneOfTheSeries(videoTitle.innerHTML)) {

      videoTitle.style = "display: none;"
      document.querySelector("ytd-text-inline-expander").style = "display: none;"
      document.querySelector("ytd-item-section-renderer.style-scope.ytd-comments").style = "display: none;"

    } else {

      videoTitle.style = ""
      document.querySelector("ytd-text-inline-expander").style = ""
      document.querySelector("ytd-item-section-renderer.style-scope.ytd-comments").style = ""

    }

    } catch {}

  }

	requestAnimationFrame(censor)
}

const urlParams = new URLSearchParams(window.location.search)

if (urlParams.get("lifespoilers") != "true") {
  requestAnimationFrame(censor)
}
