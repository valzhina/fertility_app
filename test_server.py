from typing import ByteString
import flask
import pytest
import server


TEST_USERNAME = "testname"
TEMPLATES = ["templates/homepage.html", "templates/first-page.html"]

@pytest.fixture
def client():
    server.app.config["TESTING"] = True

    with server.app.test_client() as client:
        yield client


@pytest.fixture
def client_with_name_in_session():
    """Fixture that provides a client that has a user's name stored in the session."""

    # We need to modify the session, *BUT* since we never specify the value of # the key used to store a user's name in the instructions, we have to do
    # this intermediary step to find the right key to use.
    #
    # First, we use test_client as a context manager so we can access
    # the session object. Then, we'll make a request to /get-name,
    # and search session for the key associated with our name
    # (which is just "testname")
    with server.app.test_client() as client:
        resp = client.get(f"/get-name?name={TEST_USERNAME}")
        if resp.status_code == 405:
            client.post(f"/get-name", data={"name": TEST_USERNAME})

        name_key, _ = search_for_value_in_session(flask.session, TEST_USERNAME)

    # Open another context, now that we know which session key to modify.
    with server.app.test_client() as client:
        with client.session_transaction() as sess:
            if name_key:
                sess[name_key] = TEST_USERNAME

        yield client

def search_for_value_in_session(flask_session, target_value):
    """Search flask_session for value and return its key and value if found."""

    for key, val in flask_session.items():
        if val == target_value:
            return key, val

    return None, None