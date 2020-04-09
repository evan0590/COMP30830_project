#Packages required to run tests.py
#pip install Flask-Testing
#pip install blinker

#To run in shell   
#python C:\Users\mrric\git\COMP30830_project\app\tests.py
from app import application
from flask_testing import TestCase
import unittest

class MyTest(TestCase):
    def create_app(self):
        #Creates instance of application separate from live model for testing
        application.config['TESTING'] = True
        #set mock secret key for tests
        application.secret_key='testkey'
        return application
    
    def test_index(self):
        #Tests homepage is functioning 
        tester=application.test_client()
        response=tester.get('/homepage', content_type='html/text')
        self.assertEqual(response.status_code, 200)
    
    def test_assert_template_used(self):
        #Tests html file is correctly embedded 
        tester=application.test_client()
        response = tester.get('/homepage')
        self.assertTemplateUsed('index.html')  
        
    def test_404(self):
        #Tests 404 response status is functioning
        tester=application.test_client()
        response = tester.get('/invalid_route')
        self.assertEqual(response.status_code, 404) 
    
    def test_json_response(self):
        #Tests static route response content type is json and not empty
        tester=application.test_client()
        response = tester.get('/static')
        assert response.content_type == 'application/json'
        assert response.data is not None

if __name__ == '__main__':
    unittest.main()
 
