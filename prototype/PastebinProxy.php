
<?php
    //this script acts as a serverside-proxy to pastebin.com
    //it is needed because Javascript is not able to perform GET-requests to external domains
    //The API of pastebin.com is described here: http://pastebin.com/api


    //this method comes, to a certain degree, from David Walsh
    //http://davidwalsh.name/curl-download
    function getData($url) 
    {
        $ch = curl_init();
        $timeout = 5;
        $userAgent = 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)';

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);

        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }
    
    //this method comes from StackOverflow:
    //http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions
    function startsWith($haystack, $needle)
    {
        return !strncmp($haystack, $needle, strlen($needle));
    }
    
    if($_GET['type'] == 'load')
    {
        $url = "http://pastebin.com/raw.php?i=" . $_GET['pasteId'];
        echo getData($url);
    }
    else if($_GET['type'] == 'save')
    {
        $handle = "";
        
        //Query pastebin.com here to store the data and get a handle to it
        //NOTE: How to protect the API key? It's OpenSource, so it probably isn't a good idea to put it in here...
        $api_dev_key           = '98e9a21186d41e7e91c7b13eb29907d1';
        $api_paste_code        = $_GET['data'];
        $api_paste_private     = '0'; // 0=public 1=unlisted 2=private
        $api_paste_name        = 'WebStrat Strategy'; // name or title of your paste
        $api_paste_expire_date = 'N';
        $api_paste_format      = 'javascript';
        $api_user_key          = ''; // if an invalid api_user_key or no key is used, the paste will be create as a guest
        $api_paste_name_encode = urlencode($api_paste_name);
        $api_paste_code_encode = urlencode($api_paste_code);

        $url                   = 'http://pastebin.com/api/api_post.php';
        $ch                    = curl_init($url);

        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'api_option=paste&api_user_key='.$api_user_key.'&api_paste_private='.$api_paste_private.'&api_paste_name='.$api_paste_name.'&api_paste_expire_date='.$api_paste_expire_date.'&api_paste_format='.$api_paste_format.'&api_dev_key='.$api_dev_key.'&api_paste_code='.$api_paste_code.'');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);
        curl_setopt($ch, CURLOPT_NOBODY, 0);

        $response = curl_exec($ch);
        
        //just return everything, the calling code needs to handly errors etc
        echo $response;
    }
    
?>





