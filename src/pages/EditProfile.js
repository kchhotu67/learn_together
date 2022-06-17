import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UPLOAD_FILE } from '../constants/url';
import { useAuth } from '../utils/auth';
import { client } from '../utils/client';

function EditProfile() {
    const [bio, setBio] = useState('');
    const [profile, setProfile] = useState(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            if(profile){
                formdata.append('profile', profile[0]);
            }
           
            formdata.append('bio', bio);
            const res = await client.post(UPLOAD_FILE+`/${auth.user.id}`, formdata);
            if(res.status === 200){
                console.log(res.data);
                auth.login(res.data);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <main className="update-account layout">
    <div className="container">
        <div className="layout__box">
            <div className="layout__boxHeader">
                <div className="layout__boxTitle">
                    <Link to={"/"}>
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 32 32">
                            <title>arrow-left</title>
                            <path
                                d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                            </path>
                        </svg>
                    </Link>
                    <h3>Edit your profile</h3>
                </div>
            </div>
            <div className="layout__body">
                <form className="form" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label htmlFor="profile_pic">Avatar</label>
                    <input id="profile_pic" name="profile_pic" type="file" onChange={(e) => {setProfile(e.target.files)}}/>
                </div>

                    <div className="form__group">
                        <label htmlFor="user_bio">Bio</label>
                        <textarea name="user_bio" id="user_bio" placeholder="Write about yourself..." value={bio} onChange={(e) => {setBio(e.target.value)}}></textarea>
                    </div>
                    <div className="form__action">
                        <Link to={"/"} className="btn btn--dark">Cancel</Link>
                        <button className="btn btn--main" type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </main>
  )
}

export default EditProfile