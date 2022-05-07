<?php
/*
    Dennis kibet github: @DennisRono
    Licence: MIT
*/
namespace Utils;
class RandomStringGenerator {
    /** @var string */
    protected $alphabet;
    /** @var int */
    protected $alphabetLength;
    /**
     * @param string $alphabet
     */
    public function __construct($alphabet = '') {
        if ('' !== $alphabet) {
            $this->setAlphabet($alphabet);
        } else {
            $this->setAlphabet(
                  implode(range('a', 'z'))
                . implode(range('A', 'Z'))
                . implode(range(0, 9))
            );
        }
    }
    /**
     * @param string $alphabet
     */
    public function setAlphabet($alphabet) {
        $this->alphabet = $alphabet;
        $this->alphabetLength = strlen($alphabet);
    }
    /**
     * @param int $length
     * @return string
     */
    public function generate($length) {
        $token = '';
        for ($i = 0; $i < $length; $i++) {
            $randomKey = $this->getRandomInteger(0, $this->alphabetLength);
            $token .= $this->alphabet[$randomKey];
        }
        return $token;
    }

    /**
     * @param int $min
     * @param int $max
     * @return int
     */
    protected function getRandomInteger($min, $max) {
        $range = ($max - $min);
        if ($range < 0) {
            return $min;
        }
        $log = log($range, 2);
        $bytes = (int) ($log / 8) + 1;
        $bits = (int) $log + 1;
        $filter = (int) (1 << $bits) - 1;
        do {
            $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
            $rnd = $rnd & $filter;
        } while ($rnd >= $range);
        return ($min + $rnd);
    }
}