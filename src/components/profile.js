

import useProfile from "../hooks/useProfile"
import "../index.css"
import Sidebar from "../components/SideBar"
export default function Profile() {
    const { profile, handleChange, handleToggle, handleSubmit } = useProfile()
    


    return (
<div>
            <Sidebar disabled= {true}/>
        <div className="profile-form">
            <div className="profile-form-header">
                <h3>My Profile</h3>
                <button
                    onClick={handleToggle}
                    className="profile-secondaryBtn"
                    style={{
                        color: profile.isEdit ? "red" : "blue",
                    }}
                >
                    {profile.isEdit ? "cancel" : "Edit"}
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <img src={profile.profilePicture}
 width="150px" alt="hi" htmlFor="profilePicture" />
                    <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleChange} disabled={!profile.isEdit}/>
                    {profile.clientErrors && profile.isEdit && (
                        <p className="error-msg">{profile.clientErrors.profilePicture}</p>
                    )}
                    <label htmlFor="username">username</label>
                    <br />
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        id="username"
                        value={profile.username}
                        onChange={handleChange}
                        disabled={!profile.isEdit}
                    />
                    {profile.clientErrors && profile.isEdit && (
                        <p className="error-msg">{profile.clientErrors.username}</p>
                    )}
                    <label htmlFor="email">email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        placeholder="email"
                        id="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled={!profile.isEdit}
                    />
                    {profile.clientErrors && profile.isEdit && (
                        <p className="error-msg">{profile.clientErrors.email}</p>
                    )}
                    <label htmlFor="bio">bio</label>
                    <br />
                    <input
                        type="text"
                        name="bio"
                        placeholder="bio"
                        id="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        disabled={!profile.isEdit}
                    />
                    {profile.clientErrors && profile.isEdit && (
                        <p className="error-msg">{profile.clientErrors.bio}</p>
                    )}
                </div>

                {profile.isEdit ? (
                    <input type="submit" value={"update"} className="form-btn" />
                ) : null}
            </form>
        </div></div>
    )
}