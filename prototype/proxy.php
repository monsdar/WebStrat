
<?php

    function get_data($url) {
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
    
    $url = "http://pastebin.com/raw.php?i=" . $_GET['pasteId'];
    echo get_data($url);
?>





