/**
 * Verifications Status.
 *
 * Return the HTML for the verification status icons, with the related tooltip.
 *
 * @param {type}   status       Status of the verification.
 * @param {type}   score        Confidence score.
 *
 * @return {string} Return HTML of icon.
 */
App.components.verificationIcon = function(status, score, tag = false) {
  let statusClass = ""
  let iconClass = ""
  let tooltipTitle = ""
  let scoreTitle = ""
  let tagClass = ""

  if (score) {
    scoreTitle = `<br>${i18n.t("js.verification_status.confidence_score", { score: score })}`
  }

  switch(status) {
    case "valid":
      statusClass = "verification-status-icon--valid"
      iconClass = "fa-shield-check"
      tagClass = "tag--success"
      tooltipTitle = i18n.t("js.verification_status.valid")
      break
    case "accept_all":
      statusClass = "verification-status-icon--accept-all"
      iconClass = "fa-shield-halved"
      tagClass = "tag--warning"
      tooltipTitle = `${i18n.t("js.verification_status.accept_all")} ${scoreTitle}`
      break
    case "disposable":
      statusClass = "verification-status-icon--disposable"
      iconClass = "fa-shield-exclamation"
      tagClass = "tag--warning"
      tooltipTitle = i18n.t("js.verification_status.disposable")
      break
    case "invalid":
      statusClass = "verification-status-icon--invalid"
      iconClass = "fa-shield-xmark"
      tagClass = "tag--danger"
      tooltipTitle = i18n.t("js.verification_status.invalid")
      break
    case "unknown":
      statusClass = "verification-status-icon--unknown"
      iconClass = "fa-shield-slash"
      tooltipTitle = i18n.t("js.verification_status.unknown")
      break
    case "webmail":
      statusClass = "verification-status-icon--webmail"
      iconClass = "fa-user-shield"
      tagClass = "tag--magenta"
      tooltipTitle = i18n.t("js.verification_status.webmail")
      break
    case "error":
      statusClass = "verification-status-icon--error"
      iconClass = "fa-xmark"
      tagClass = "tag--danger"
      tooltipTitle = i18n.t("js.verification_status.error")
      break
    case "pending":
      statusClass = "verification-status-icon--pending fa-spin"
      iconClass = "fa-spinner-third fa-spin"
      tooltipTitle = i18n.t("js.verification_status.pending")
      break
  }

  if (tag) {
    return `<span class="tag ${tagClass}" title="${tooltipTitle}" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" data-bs-container="body">
            <span class="tag__label"><span class="tag__icon ${statusClass} fas ${iconClass}" aria-hidden="true"></span> ${score}%</span></span>`
  } else {
    return `<span class="verification-status-icon ${statusClass} fas ${iconClass}" title="${tooltipTitle}"
            aria-hidden="true" data-bs-toggle="tooltip" data-bs-html="true" data-bs-placement="top" data-bs-container="body"></span>`
  }
};
