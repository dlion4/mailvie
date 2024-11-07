from fastapi import HTTPException, Request


# Authorization dependency
def authorize_requester_user(request: Request):
    # Access the headers
    security_token = request.headers.get("X-Main-Req-security")
    ssh_certificate = request.headers.get("X-SSH-Certificate")

    # print(security_token)
    # print(ssh_certificate)

    # Validate security token and SSH certificate
    if not security_token or security_token != "valid-token":
        raise HTTPException(
            status_code=403, detail="Invalid or missing security token."
        )
    if not ssh_certificate or ssh_certificate != "valid-ssh-cert":
        raise HTTPException(
            status_code=403, detail="Invalid or missing SSH certificate."
        )
    # Return True if both validations pass
    return True
