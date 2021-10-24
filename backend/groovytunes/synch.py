import spotipy
from spotipy import SpotifyOAuth
import os
from django.db import models
from models import Playlist
from .serializer import *

os.environ['SPOTIPY_CLIENT_ID'] = "e669ed62315040a09ffdb89afa0cf649"
os.environ['SPOTIPY_CLIENT_SECRET'] = "4283d027252045ec8ec81bc2d796349a"
os.environ['SPOTIPY_REDIRECT_URI'] = 'http://example.com/'

scope = "user-library-read user-library-modify playlist-modify-public"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))


def synchroniseSpotifyUserPlaylists():
    # when running playlist subpage, every time synchronise all playlist form spotify to our database
    # DB -> Spotify
    # delete playlists removed in spotify
    spotify_playlists = sp.current_user_playlists(limit=30)
    spotify = []
    user_id = sp.current_user()['id']
    for playlist in spotify_playlists["items"]:
        if playlist["owner"]['id'] == user_id:
            spotify.append(playlist)
            print(spotify)
    database = PlaylistSerializer(Playlist.objects.all(), many=True).data

    for playlist in database:
        for spoti in spotify:
            if spoti['id'] == playlist['spotify_id']:
                break
        pl_id = playlist['id']
        pl = Playlist.objects.get(pk=pl_id)
        pl.delete()
    # add/ playlist form spotify + synchronise
    for spoti in spotify:
        for playlist in database:
            if spoti['id'] == playlist['spotify_id']:
                if spoti['description'] != playlist['description'] or spoti['name'] != playlist['name']:
                    pass # change in database accordingly to spotify
                    break
        data = {'user': 1, # what to do here?
        'name': playlist['name'],
        'rating_sum': 0,
        'rating_number': 0,
        'spotify_id': spoti['id'],
        'description': spoti['description']}
        PlaylistSerializer(data=data).save()


