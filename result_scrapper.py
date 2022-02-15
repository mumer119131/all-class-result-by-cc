# imports
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options
import time
import os

options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
op = webdriver.ChromeOptions()
op.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
op.add_argument("--headless")
op.add_argument("--no-sandbox")
op.add_argument("--disable-dev-sh-usage")


def result_scrapper(ag):
    result = dict()
    base_url_lms = "http://lms.uaf.edu.pk/login/index.php"
    driver = webdriver.Chrome(
        executable_path='F:\Outputs\Python Outputs\Web Scraping\Overall Result Compare\chromedriver.exe', chrome_options=options)
    # load the web browser
    driver.get(base_url_lms)
    # get the elements
    ag_no_field = driver.find_element_by_id("REG")
    search_btn = driver.find_element_by_xpath(
        "/html/body/div[3]/div/section/div/div/div/div[4]/div[1]/div[2]/div/div[1]/form/div[2]/input[3]")
    # enter the ag no into the feild and serach
    ag_no_field.send_keys(ag)
    ActionChains(driver).click(search_btn).perform()

    name = driver.find_element_by_xpath(
        "/html/body/table[1]/tbody/tr[2]/td[2]").text
    ag = driver.find_element_by_xpath(
        "/html/body/table[1]/tbody/tr[1]/td[2]").text
    # Calcualte the number of rows and cols in the result
    rows = len(driver.find_elements_by_xpath("/html/body/table[2]/tbody/tr"))
    cols = len(driver.find_elements_by_xpath(
        "/html/body/table[2]/tbody/tr[2]/td"))
    result["name"] = name
    result["ag"] = ag

    for i in range(2, rows+1):
        course_code = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[4]")).text.upper()
        total_marks = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[11]")).text.upper()
        credit_hrs = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[6]")).text.upper()
        grade = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[12]")).text.upper()
        index = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[1]")).text
        mid = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[7]")).text
        assignment = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[8]")).text
        final = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[9]")).text
        practical = (driver.find_element_by_xpath(
            "/html/body/table[2]/tbody/tr["+str(i)+"]/td[10]")).text
        sub_result = dict()
        sub_result["course_code"] = course_code
        sub_result["assignment"] = assignment
        sub_result["mid"] = mid
        sub_result["final"] = final
        sub_result["practical"] = practical
        sub_result["total_marks"] = total_marks
        sub_result["credit_hrs"] = credit_hrs
        sub_result["grade"] = grade
        result[index] = sub_result
    driver.close()

    print(result)

    return result


if __name__ == "__main__":
    result_scrapper("2019-ag-6081")
